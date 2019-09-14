import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { VALID } from '@angular/forms/src/model';

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
    private datepipe: DatePipe
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
    val.nomor_barang = val.nomor_barang.nomor_barang;
    console.log(val);
    var subs = this.func.postData(val, 'barangkeluarinsert').subscribe(
      async resp =>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.router.navigateByUrl('/menu/barangkeluar');
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
        subs.unsubscribe();
      }
    )
    
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
