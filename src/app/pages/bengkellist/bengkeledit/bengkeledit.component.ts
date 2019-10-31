import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-bengkeledit',
  templateUrl: './bengkeledit.component.html',
  styleUrls: ['./bengkeledit.component.scss'],
})
export class BengkeleditComponent implements OnInit {

  editmode:Boolean = false;
  id = this.actr.snapshot.params['id'];
  old_value;
  
  bengkeledit: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService,
    private actr: ActivatedRoute
  ) {
    this.bengkeledit = this.fb.group({
      nama_bengkel: ['', Validators.required],
    })
   }

  async ngOnInit() {
    await this.loadBengkel();
    this.editmode = false;
  }

  async loadBengkel(){
    await this.func.getDataWithParams(this.id, 'bengkelread/').toPromise().then(
      async resp => {
        if(resp['success']){
          this.old_value = await resp['data'];
          this.bengkeledit.controls['nama_bengkel'].setValue(this.old_value.nama_bengkel);
        }
      }
    );
  }

  Tambah(val){
    val.id = this.id
    val.dibuat_oleh = this.func.user;
    // console.log(JSON.stringify(val));
    this.func.postData(val, 'bengkelupdate').toPromise().then(
      async resp =>{
        if (resp['success']){
          await this.Audits(val);
          this.bengkeledit.controls['nama_bengkel'].setValue('');
        }
      }
    )
    
  }

  async Audits(val){
    val = JSON.stringify(val);
    var oldval = JSON.stringify(this.old_value);
    await this.func.Audits('Edit Bengkel', val, oldval).then(
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
