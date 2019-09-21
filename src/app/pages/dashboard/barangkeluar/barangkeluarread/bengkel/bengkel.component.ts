import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { BrgkeluarinfoComponent } from 'src/app/pages/modal/brgkeluarinfo/brgkeluarinfo.component';

@Component({
  selector: 'app-bengkel',
  templateUrl: './bengkel.component.html',
  styleUrls: ['./bengkel.component.scss'],
})
export class BengkelComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  bengkelarr:Array<any>;
  bengkel:string;
  list_bengkel:Array<any>;
  landscape:Boolean;
  screenEvent;
  subsEvent;
  jsonsend = {};

  constructor(
    private func: FunctionService,
    private eventEmitterService:EventEmitterService,
    private modalCtrl:ModalController
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
        this.loadBengkel();
      });    
    }
    this.loadBengkel();
  }

  loadBengkel(){
    this.func.getDataWithoutParams('bengkeldis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.bengkelarr = resp['data'];
        }
      }
    )
    if (this.bengkel != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      bengkel:this.bengkel
    }
    this.func.postData(this.jsonsend, 'bengkel').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_bengkel = resp['data'];
        }
      }
    )
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: BrgkeluarinfoComponent
    });
    return await modal.present();
  }

  transport(){
    this.func.TransferDataBrgKlr = {
      url:'bengkel',
      json:this.jsonsend
    }
    localStorage.setItem('tdataklr', JSON.stringify(this.func.TransferDataBrgKlr));
    this.presentModal();
  }

}
