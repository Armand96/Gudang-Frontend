import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-noordercreate',
  templateUrl: './noordercreate.component.html',
  styleUrls: ['./noordercreate.component.scss'],
})
export class NoordercreateComponent implements OnInit {

  orderbaru:FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService
  ) { 
    this.orderbaru = this.fb.group({
      no_order: ['', Validators.required],
      bengkel: ['', Validators.required],
    })
  }

  ngOnInit() {}

  Tambah(val){
    
    val.kuantitas = 0;
    // console.log(JSON.stringify(val));
    this.func.postData(val, 'noordercreate').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
        }
      }
    )
    
  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Tambah Nomor Order', val, '').then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/noorder');
        }
      }
    );
  }

}
