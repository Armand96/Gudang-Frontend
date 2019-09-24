import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-kodepekerjaanlist',
  templateUrl: './kodepekerjaanlist.component.html',
  styleUrls: ['./kodepekerjaanlist.component.scss'],
})
export class KodepekerjaanlistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subsEvent.unsubscribe();
    this.screenEvent.unsubscribe();
  }

  subsEvent;
  screenEvent; 
  isLandScape:Boolean;
  data;
  temp = [];

  constructor(
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService
  ) { }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((o)=>{
      return ['kode_pekerjaan', 'pekerjaan'].some(
        (k)=>{
          return o[k].toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
      );
    });

    // update the rows
    this.data = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  ngOnInit() {
    this.screenEvent = this.func.landscape.subscribe(
      resp=>{
        this.isLandScape = resp;
      }
    )
    
    if (this.subsEvent==undefined) {    
      this.subsEvent = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {  
        this.reinit();
      });    
    }
    this.reinit();
  }

  async reinit(){
    this.func.landscape.next(this.plat.isLandscape());
    await this.LoadData();
    this.temp = [...this.data];
  }

  async LoadData(){
    await this.func.getDataWithoutParams('kodepekerjaanall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
      },
      err=>{
        // if (!err.ok){
        //   this.func.presentToast('Tidak dapat terhubung ke server', 'text-center', 'danger', 5000);
        // }
      }
    );
  }

}
