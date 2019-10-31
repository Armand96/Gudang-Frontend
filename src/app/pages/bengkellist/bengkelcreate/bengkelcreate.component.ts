import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-bengkelcreate',
  templateUrl: './bengkelcreate.component.html',
  styleUrls: ['./bengkelcreate.component.scss'],
})
export class BengkelcreateComponent implements OnInit {

  bengkelbaru: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService
  ) {
    this.bengkelbaru = this.fb.group({
      nama_bengkel: ['', Validators.required],
    })
   }

  ngOnInit() {}

  Tambah(val){
    
    val.dibuat_oleh = this.func.user;
    // console.log(JSON.stringify(val));
    this.func.postData(val, 'bengkelinsert').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
          this.bengkelbaru.controls['nama_bengkel'].setValue('');
        }
      }
    )
    
  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Tambah Bengkel', val, '').then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/bengkel');
        }
      }
    );
  }

}
