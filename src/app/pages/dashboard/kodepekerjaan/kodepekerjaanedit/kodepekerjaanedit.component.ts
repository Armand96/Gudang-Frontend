import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-kodepekerjaanedit',
  templateUrl: './kodepekerjaanedit.component.html',
  styleUrls: ['./kodepekerjaanedit.component.scss'],
})
export class KodepekerjaaneditComponent implements OnInit {

  kodepekerjaan:FormGroup
  kode_pekerjaan = this.actr.snapshot.params['id'];
  jsonsend = {
    kode_pekerjaan:this.kode_pekerjaan
  }
  old_value

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService,
    private actr: ActivatedRoute,
  ) {
    this.kodepekerjaan = this.fb.group({
      kode_pekerjaan: ['', Validators.required],
      pekerjaan: ['', Validators.required],
    })
  }

   ngOnInit() {
    this.loadSingleKodePekerjaan();
  }

  async loadSingleKodePekerjaan(){
    await this.func.postData(this.jsonsend, 'kodepekerjaansingle').toPromise().then(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];
          this.kodepekerjaan.controls['kode_pekerjaan'].setValue(this.old_value.kode_pekerjaan);
          this.kodepekerjaan.controls['pekerjaan'].setValue(this.old_value.pekerjaan);
        }
      }
    );
  }

  async Edit(val){

    val.kode_pekerjaan_old = this.old_value.kode_pekerjaan
    await this.func.postData(val, 'kodepekerjaanupdate').toPromise().then(
      async resp => {
        if (resp['success']){
          await this.Audits(val);
          await this.func.presentToast('Edit Berhasil', 'text-center', 'primary');
          this.router.navigateByUrl("menu/kodepekerjaan");
          this.eventEmitter.onFirstComponentButtonClick();
          // this.navctrl.navigateBack("/menu/barang");
        }
      }
    );
  }

  async Audits(val){
    delete val.kode_pekerjaan_old;
    var oldval = JSON.stringify(this.old_value);
    val = JSON.stringify(val);
    await this.func.Audits('Edit Kode Pekerjaan', val, oldval).then(
      async resp => { return true }
    );
  }

}
