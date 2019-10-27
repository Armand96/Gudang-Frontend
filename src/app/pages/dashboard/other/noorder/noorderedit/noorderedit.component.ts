import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-noorderedit',
  templateUrl: './noorderedit.component.html',
  styleUrls: ['./noorderedit.component.scss'],
})
export class NoordereditComponent implements OnInit {

  orderedit:FormGroup
  no_order = this.actr.snapshot.params['id'];
  jsonsend = {
    no_order:this.no_order
  }
  old_value
  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService,
    private actr: ActivatedRoute,
  ) {
    this.orderedit = this.fb.group({
      no_order: ['', Validators.required],
      bengkel: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadSingleNoOrder();
  }

  async loadSingleNoOrder(){
    await this.func.postData(this.jsonsend, 'noordersingle').toPromise().then(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];
          this.orderedit.controls['no_order'].setValue(this.old_value.no_order);
          this.orderedit.controls['bengkel'].setValue(this.old_value.bengkel);
        }
      }
    );
  }

  async Edit(val){

    val.no_order_old = this.old_value.no_order
    await this.func.postData(val, 'noorderupdate').toPromise().then(
      async resp => {
        if (resp['success']){
          await this.Audits(val);
          await this.func.presentToast('Edit Berhasil', 'text-center', 'primary');
          this.router.navigateByUrl("menu/noorder");
          this.eventEmitter.onFirstComponentButtonClick();
          // this.navctrl.navigateBack("/menu/barang");
        }
      }
    );
  }

  async Audits(val){
    delete val.no_order_old;
    var oldval = JSON.stringify(this.old_value);
    val = JSON.stringify(val);
    await this.func.Audits('Edit No. Order', val, oldval).then(
      async resp => { return true }
    );
  }

}
