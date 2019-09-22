import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { BrgkeluarinfoComponent } from 'src/app/pages/modal/brgkeluarinfo/brgkeluarinfo.component';

@Component({
  selector: 'app-nospm',
  templateUrl: './nospm.component.html',
  styleUrls: ['./nospm.component.scss'],
})
export class NospmComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  jsonsend;
  no_spmarr:Array<any>;
  no_spm:string;
  list_no_spm:Array<any>;
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
        this.loadNoSPM();
      });    
    }
    this.loadNoSPM();
  }

  loadNoSPM(){
    this.func.getDataWithoutParams('nospmdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.no_spmarr = resp['data'];
        }
      }
    )
    if (this.no_spm != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      no_spm:this.no_spm
    }
    this.func.postData(this.jsonsend, 'nospm').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_no_spm = resp['data'];
        }
      }
    )
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BrgkeluarinfoComponent
    });
    return await modal.present();
  }

  transport(){
    this.func.TransferDataBrgKlr = {
      url:'nospm',
      json:this.jsonsend
    }
    
    localStorage.setItem('tdataklr', JSON.stringify(this.func.TransferDataBrgKlr));
    this.presentModal();
    
  }


}
