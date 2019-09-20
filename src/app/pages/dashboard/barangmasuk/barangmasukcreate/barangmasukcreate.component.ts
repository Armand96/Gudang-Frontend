import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-barangmasukcreate',
  templateUrl: './barangmasukcreate.component.html',
  styleUrls: ['./barangmasukcreate.component.scss'],
})
export class BarangmasukcreateComponent implements OnInit {

  barangbarumasuk:FormGroup
  NomorBarang:any;
  constructor(
    private func:FunctionService,
    private fb:FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private eventEmitter: EventEmitterService
  ) {
    this.barangbarumasuk = this.fb.group({
      asal_barang: ['', Validators.required],
      no_kontrak: ['', Validators.required],
      nomor_barang: ['', Validators.required],
      jml_msk_angka: ['', Validators.required],
      jml_msk_huruf: ['', Validators.required],
      keterangan: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadNomorBarang();
  }

  async Tambah(val){
    
    val.tgl_masuk = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (val.nomor_barang.nomor_barang != null || val.nomor_barang.nomor_barang != undefined ) {
      val.nomor_barang = val.nomor_barang.nomor_barang;
    }
    await this.func.postData(val, 'barangmasukinsert').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
          await this.updateStock(val);
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
        
      }
    )
    
  }

  async updateStock(val){
    
    val.kuantitas = val.jml_msk_angka;
    await this.func.postData(val, 'barangupdateq').toPromise().then(
      async resp => {
        if (resp['success']){
          // console.log(resp)
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/barangmasuk');
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      }
    )

  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Barang Masuk', val, '').then(
      async resp => {}
    );
  }

  async loadNomorBarang(){
    await this.func.getDataWithoutParams("nomornamabarangonly").toPromise().then(
      resp => {
        if (resp['success']){
          this.NomorBarang = resp['data'];
        }
      }
    );
  }

  konversi(val){
    this.barangbarumasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val.jml_msk_angka));
  }
}
