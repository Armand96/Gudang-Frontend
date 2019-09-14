import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-barangkeluar',
  templateUrl: './barangkeluar.component.html',
  styleUrls: ['./barangkeluar.component.scss'],
})
export class BarangkeluarComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.func.landscape.unsubscribe();
    this.eventEmitterService.invokeFirstComponentFunction.unsubscribe();
  }

  landscape:Boolean;
  data;
  temp = [];

  constructor(
    private router:Router, 
    private renderer:Renderer, 
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService 
  ) {
    this.func.landscape.subscribe(
      resp=>{
        this.landscape = resp;
      }
    )
  }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {  
        this.reinit();
      });    
    }
    this.reinit();
  }

  async reinit(){
    this.landscape = this.plat.isLandscape();
    // (this.landscape) ? this.descktop() : this.mobile();
    this.descktop();
    await this.func.delay(1000);
    this.temp = [...this.data];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((o)=>{
      return ['proyek', 'no_order', 'nomor_barang', 'tgl_keluar', 'jml_klr_angka'].some(
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

  mobile(){
    var subs = this.func.getDataWithoutParams('barangkeluarshowall').subscribe(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  descktop() {
    var subs = this.func.getDataWithoutParams('barangkeluarshowall').subscribe(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

}
