import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-asalbarang',
  templateUrl: './asalbarang.component.html',
  styleUrls: ['./asalbarang.component.scss'],
})
export class AsalbarangComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
    // console.log('destroy')
  }

  asal:Array<any>;
  asal_barang
  list_asal:Array<any>;
  landscape:Boolean;
  screenEvent;
  subsEvent;
  jsonsend = {};

  constructor(
    private func: FunctionService,
    private eventEmitterService:EventEmitterService
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
        this.loadAsal();
      });    
    }
    this.loadAsal();
  }

  loadAsal(){
    this.func.getDataWithoutParams('asalbarangdis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.asal = resp['data'];
        }
      }
    )
    if (this.asal_barang != null) this.onChange();
  }

  async onChange(){
    await this.func.delay(50);
    this.jsonsend = {
      asal_barang:this.asal_barang
    }
    this.func.postData(this.jsonsend, 'asalbarang').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_asal = resp['data'];
        }
      }
    )
  }

  transport(){
    this.func.TransferDataBrgMsk = {
      url:'asalbarang',
      json:this.jsonsend
    }
    localStorage.setItem('tdatamsk', JSON.stringify(this.func.TransferDataBrgMsk));
  }

}
