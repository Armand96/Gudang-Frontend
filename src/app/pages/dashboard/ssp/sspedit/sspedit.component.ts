import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-sspedit',
  templateUrl: './sspedit.component.html',
  styleUrls: ['./sspedit.component.scss'],
})
export class SspeditComponent implements OnInit {

  editspp: FormGroup
  editmode:Boolean = false;
  NoOrder;

  id = this.actr.snapshot.params['id'];
  old_value;

  constructor(
    private actr: ActivatedRoute,
    private func: FunctionService,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private eventEmitter: EventEmitterService
  ) {
    this.editspp = this.fb.group({
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
    this.loadSingleSPP();
  }

  async loadSingleSPP(){
    await this.func.getDataWithParams(this.id, 'pengadaansingle/').toPromise().then(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];
          this.editspp.controls['no_spp'].setValue(this.old_value.no_spp);
          this.editspp.controls['proyek'].setValue(this.old_value.proyek);
          this.editspp.controls['no_order'].setValue(this.old_value.no_order);
          this.editspp.controls['tgl_penerimaan'].setValue(this.old_value.tgl_penerimaan);
          this.editspp.controls['nama_barang'].setValue(this.old_value.nama_barang);
          this.editspp.controls['jml_diminta'].setValue(this.old_value.jml_diminta);
          this.editspp.controls['satuan'].setValue(this.old_value.satuan);
          this.editspp.controls['keterangan'].setValue(this.old_value.keterangan);
        }
      }
    );
  }

  Edit(val) {
    
    val.id = this.id;
    this.func.postData(val, 'pengadaanupdate').toPromise().then(
      async resp => {
        if (resp['success']) {
          await this.Audits(val);
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
          this.eventEmitter.onFirstComponentButtonClick();
          this.func.backClicked();
        } else {
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      },
      err => {}
    )

  }

  async Audits(val) {

    val = JSON.stringify(val);
    var old_val = JSON.stringify(this.old_value);
    await this.func.Audits('Pengadaan Edit', val, old_val).then(
      async resp => { }
    );
  }

}
