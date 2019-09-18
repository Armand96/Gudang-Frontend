import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {

  user:FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService
  ) { 
    this.user = this.fb.group({
      nomor_pegawai: ['', Validators.required],
      username: ['', Validators.required],
      userpassword: ['', Validators.required],
      // kuantitas: ['', Validators.required],
      // harga_satuan: ['', Validators.required],
    })
  }

  ngOnInit() {}

  addUser(val){
    
    val.dibuat_oleh = this.func.user;
    val.kuantitas = 0;
    // console.log(JSON.stringify(val));
    this.func.postData(val, 'userinsert').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
          this.user.controls['nomor_pegawai'].setValue('');
          this.user.controls['username'].setValue('');
          this.user.controls['userpassword'].setValue('');
        }
      }
    )
    
  }

  async Audits(val){
    val.userpassword = '*****'
    val = JSON.stringify(val);
    await this.func.Audits('Tambah Pengguna', val, '').then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
        }
      }
    );
  }

}
