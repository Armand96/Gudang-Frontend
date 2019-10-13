import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-ssp',
  templateUrl: './ssp.component.html',
  styleUrls: ['./ssp.component.scss'],
})
export class SspComponent implements OnInit, OnDestroy {

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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((o)=>{
      return ['no_spp', 'tgl_pengadaan', 'nama_barang', 'jml_diminta', 'satuan'].some(
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

  exportAsXLSX():void {
    this.data = this.data.filter( (props) =>{
      delete props.dibuat_oleh;
      delete props.harga_satuan;
      return true;
    });
    this.func.exportAsExcelFile(this.data, "List SPP");
  }

  async reinit(){
    this.func.landscape.next(this.plat.isLandscape());
    await this.LoadData();
    this.temp = [...this.data];
  }

  async LoadData(){
    await this.func.getDataWithoutParams('pengadaanshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
      },
      err=>{}
    );
  }

}
