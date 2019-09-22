import { BrgmasukinfoComponent } from 'src/app/pages/modal/brgmasukinfo/brgmasukinfo.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nobapm',
  templateUrl: './nobapm.component.html',
  styleUrls: ['./nobapm.component.scss'],
})
export class NobapmComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  jsonsend;
  no_bapmarr:Array<any>;
  no_bapm:string;
  list_no_bapm:Array<any>;
  landscape:Boolean;
  screenEvent;
  subsEvent;

  constructor(
    private func: FunctionService,
    private eventEmitterService:EventEmitterService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.landscape = this.func.plat.isLandscape();
    this.screenEvent = this.func.landscape.subscribe(
      resp=>{
        this.landscape = resp;
      }
    )
    if (this.subsEvent==undefined) {    
      this.subsEvent = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {  
        this.loadNoBAPM();
      });    
    }
    this.loadNoBAPM();
  }

  loadNoBAPM(){
    this.func.getDataWithoutParams('nobapmdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.no_bapmarr = resp['data'];
        }
      }
    )
    if (this.no_bapm != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      no_bapm:this.no_bapm
    }
    this.func.postData(this.jsonsend, 'nobapm').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_no_bapm = resp['data'];
        }
      }
    )
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BrgmasukinfoComponent
    });
    return await modal.present();
  }

  transport(){
    this.func.TransferDataBrgMsk = {
      url:'nobapm',
      json:this.jsonsend
    }
    
    localStorage.setItem('tdatamsk', JSON.stringify(this.func.TransferDataBrgMsk));
    this.presentModal();
    
  }

}
