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

  Tambah(val){
    
    val.tgl_masuk = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    var subs = this.func.postData(val, 'barangmasukinsert').subscribe(
      async resp =>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/barangmasuk');
        } else{
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
        subs.unsubscribe();
      }
    )
    
  }

  loadNomorBarang(){
    var subs = this.func.getDataWithoutParams("nomorbarangonly").subscribe(
      resp => {
        if (resp['success']){
          this.NomorBarang = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  konversi(val){
    this.barangbarumasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val.jml_msk_angka));
  }
}
