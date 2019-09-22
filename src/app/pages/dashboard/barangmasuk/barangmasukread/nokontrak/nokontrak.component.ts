import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { BrgmasukinfoComponent } from 'src/app/pages/modal/brgmasukinfo/brgmasukinfo.component';

@Component({
  selector: 'app-nokontrak',
  templateUrl: './nokontrak.component.html',
  styleUrls: ['./nokontrak.component.scss'],
})
export class NokontrakComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  kontrak:Array<any>;
  no_kontrak
  list_no_kontrak:Array<any>;
  landscape:Boolean;
  screenEvent;
  subsEvent;
  jsonsend = {};

  constructor(
    private func: FunctionService,
    private eventEmitterService: EventEmitterService,
    private modalCtrl: ModalController
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
        this.loadKontrak();
      });    
    }
    this.loadKontrak();
  }

  loadKontrak(){
    this.func.getDataWithoutParams('nokontrakdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.kontrak = resp['data'];
        }
      }
    )
    if (this.no_kontrak != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      no_kontrak:this.no_kontrak
    }
    this.func.postData(this.jsonsend, 'nokontrak').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_no_kontrak = resp['data'];
        }
      }
    )
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: BrgmasukinfoComponent
    });
    return await modal.present();
  }

  transport(){
    this.func.TransferDataBrgMsk = {
      url:'nokontrak',
      json:this.jsonsend
    }
    localStorage.setItem('tdatamsk', JSON.stringify(this.func.TransferDataBrgMsk));
    this.presentModal();
  }
  

}
