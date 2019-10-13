import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-sspcreate',
  templateUrl: './sspcreate.component.html',
  styleUrls: ['./sspcreate.component.scss'],
})
export class SspcreateComponent implements OnInit {

  tambahspp: FormGroup
  NoOrder;

  constructor(
    private func: FunctionService,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private eventEmitter: EventEmitterService
  ) {
    this.tambahspp = this.fb.group({
      no_spp: ['', Validators.required],
      proyek: ['', Validators.required],
      no_order: ['', Validators.required],
      tgl_penerimaan: ['', Validators.required],
      nama_barang: ['', Validators.required],
      jml_diminta: ['', Validators.required],
      satuan: ['', Validators.required],
      keterangan: ['', Validators.required],
    })
  }

  ngOnInit() { 
    this.loadOrder();
  }

  async loadOrder() {
    await this.func.getDataWithoutParams('noorderall').toPromise().then(
      resp => {
        if (resp['success']) {
          this.NoOrder = resp['data'];
        }
      },
      err => { }
    );
  }
  

  Tambah(val) {
    
    val.tgl_penerimaan = this.datepipe.transform(val.tgl_penerimaan, 'yyyy-MM-dd' )
    val.tgl_pengadaan = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.func.postData(val, 'pengadaaninsert').toPromise().then(
      async resp => {
        if (resp['success']) {
          await this.Audits(val);
          this.tambahspp.controls['nama_barang'].setValue('');
          this.tambahspp.controls['jml_diminta'].setValue('');
          this.tambahspp.controls['satuan'].setValue('');
        } else {
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      },
      err => {}
    )

  }

  async Audits(val) {
    val = JSON.stringify(val);
    await this.func.Audits('Pengadaan', val, '').then(
      async resp => { 
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
        }
      }
    );
  }

  Done() {
    this.eventEmitter.onFirstComponentButtonClick();
    this.router.navigateByUrl('/menu/ssp');
  }

}
