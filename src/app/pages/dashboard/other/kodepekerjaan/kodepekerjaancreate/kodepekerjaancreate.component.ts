import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-kodepekerjaancreate',
  templateUrl: './kodepekerjaancreate.component.html',
  styleUrls: ['./kodepekerjaancreate.component.scss'],
})
export class KodepekerjaancreateComponent implements OnInit {

  kodepekerjaan:FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService
  ) {
    this.kodepekerjaan = this.fb.group({
      kode_pekerjaan: ['', Validators.required],
      pekerjaan: ['', Validators.required],
    })
  }

  ngOnInit() {}

  Tambah(val){
    
    val.kuantitas = 0;
    this.func.postData(val, 'kodepekerjaancreate').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
        }
      }
    )
    
  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Tambah Kode Pekerjaan', val, '').then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/kodepekerjaan');
        }
      }
    );
  }

}
