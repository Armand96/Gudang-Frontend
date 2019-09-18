import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { VALID } from '@angular/forms/src/model';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-barangkeluarcreate',
  templateUrl: './barangkeluarcreate.component.html',
  styleUrls: ['./barangkeluarcreate.component.scss'],
})
export class BarangkeluarcreateComponent implements OnInit {

  barangbarukeluar:FormGroup
  NomorBarang:any;
  constructor(
    private func:FunctionService,
    private fb:FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private eventEmitter: EventEmitterService
  ) { 
    this.barangbarukeluar = this.fb.group({
      proyek: ['', Validators.required],
      no_order: ['', Validators.required],
      bengkel: ['', Validators.required],
      pekerjaan: ['', Validators.required],
      kode_pekerjaan: ['', Validators.required],
      nomor_barang: ['', Validators.required],
      jml_klr_angka: ['', Validators.required],
      jml_klr_huruf: ['', Validators.required],
      jml_klr_permintaan_angka: ['', Validators.required],
      jml_klr_permintaan_huruf: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadNomorBarang();
  }

  Tambah(val){
    
    val.tgl_keluar = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (val.nomor_barang.nomor_barang != null || val.nomor_barang.nomor_barang != undefined ) {
      val.nomor_barang = val.nomor_barang.nomor_barang;
    }
    
    var subs = this.func.postData(val, 'barangkeluarinsert').subscribe(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
          await this.updateStock(val);
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
        subs.unsubscribe();
      }
    )
    
  }

  async updateStock(val){
    val.kuantitas = -val.jml_klr_angka;
    console.log(val);
    await this.func.postData(val, 'barangupdateq').toPromise().then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/barangkeluar');
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      }
    );
  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Barang Keluar', val, '').then(
      async resp => {}
    );
  }

  loadNomorBarang(){
    var subs = this.func.getDataWithoutParams("nomornamabarangonly").subscribe(
      resp => {
        if (resp['success']){
          this.NomorBarang = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  konversi(val){
    this.barangbarukeluar.controls['jml_klr_huruf'].setValue(this.func.terbilang(val));
  }

  konversi2(val){
    this.barangbarukeluar.controls['jml_klr_permintaan_huruf'].setValue(this.func.terbilang(val));
  }

}
