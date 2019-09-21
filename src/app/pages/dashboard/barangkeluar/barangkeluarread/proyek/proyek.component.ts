import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { BrgkeluarinfoComponent } from 'src/app/pages/modal/brgkeluarinfo/brgkeluarinfo.component';

@Component({
  selector: 'app-proyek',
  templateUrl: './proyek.component.html',
  styleUrls: ['./proyek.component.scss'],
})
export class ProyekComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  jsonsend;
  proyekarr:Array<any>;
  proyek:string;
  list_proyek:Array<any>;
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
        this.loadProyek();
      });    
    }
    this.loadProyek();
  }

  loadProyek(){
    this.func.getDataWithoutParams('proyekdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.proyekarr = resp['data'];
        }
      }
    )
    if (this.proyek != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      proyek:this.proyek
    }
    this.func.postData(this.jsonsend, 'proyek').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_proyek = resp['data'];
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
      url:'proyek',
      json:this.jsonsend
    }
    
    localStorage.setItem('tdataklr', JSON.stringify(this.func.TransferDataBrgKlr));
    this.presentModal();
    
  }

}
