import { SspinfoComponent } from './../../../modal/sspinfo/sspinfo.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sspread',
  templateUrl: './sspread.component.html',
  styleUrls: ['./sspread.component.scss'],
})
export class SspreadComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  jsonsend;
  no_spparr:Array<any>;
  no_spp:string;
  list_no_spp:Array<any>;
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
        this.loadNoSPP();
      });    
    }
    this.loadNoSPP();
  }

  loadNoSPP(){
    this.func.getDataWithoutParams('nosppdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.no_spparr = resp['data'];
        }
      }
    )
    if (this.no_spp != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      no_spp:this.no_spp
    }
    this.func.postData(this.jsonsend, 'nospp').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_no_spp = resp['data'];
        }
      }
    )
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SspinfoComponent
    });
    return await modal.present();
  }

  transport(){
    this.func.TransferSPP = {
      url:'nospp',
      json:this.jsonsend
    }
    
    localStorage.setItem('tspp', JSON.stringify(this.func.TransferSPP));
    this.presentModal();
    
  }

}
