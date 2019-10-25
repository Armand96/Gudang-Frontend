import { Component, OnInit, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-barangmasuk',
  templateUrl: './barangmasuk.component.html',
  styleUrls: ['./barangmasuk.component.scss'],
})
export class BarangmasukComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.subsEvent.unsubscribe();
    this.screenEvent.unsubscribe();
  }

  subsEvent;
  screenEvent; 

  // dtOptions: DataTables.Settings = {};
  landscape:Boolean;
  data;
  temp = [];

  constructor(
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService
  ) {
   }

  ngOnInit() {
    this.screenEvent = this.func.landscape.subscribe(
      resp=>{
        this.landscape = resp;
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
      return ['nomor_barang', 'tgl_masuk', 'no_kontrak', 'asal_barang', 'jml_msk_angka','no_bapm'].some(
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
      delete props.id;
      return true;
    });
    this.func.exportAsExcelFile(this.data, "Daftar Barang Masuk");
    // this.func.customReportBrgMasuk();
  }

  async descktop() {
    await this.func.getDataWithoutParams('barangmasukshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
      }
    );
    // await this.func.getDataWithoutParams('barangmasukdis').toPromise().then(
    //   resp => {
    //     if (resp['success']){
    //       this.data = resp['data'];
    //     }
    //   }
    // );
  }

  // desktop(){
  //   this.dtOptions = {
  //     ajax: {
  //       url:this.func.url+"barangmasukshowall",
  //       type:"GET",
  //       headers: this.func.dtHeaders
  //     },
  //     columnDefs:[
  //       {
  //         className: "dt-center",
  //         targets: "_all",
  //         type: 'date-eu'
  //       }
  //     ],
  //     columns: [
  //       {data:"nomor_barang"},
  //       {
  //         data: "tgl_masuk",
  //         render: (data)=>{
  //           return this.datepipe.transform(data, "dd MMMM yyyy");
  //         }
  //       },
  //       {data:"no_kontrak"},
  //       {data:"asal_barang"},
  //       {data:"jml_msk_angka"},
  //       {
  //         data:"id",
  //         render: function (data: any, type: any, full: any) {
  //           return '<td> <ion-button detailid="'+data+'"> Detail </ion-button> </td>';
  //         }
  //       },
  //     ]
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.renderer.listen('document', 'click', (event) => {
  //     if (event.target.hasAttribute("detailid")) {
  //       this.router.navigateByUrl("/menu/editbarangmasuk/"+ event.target.getAttribute("detailid"));
  //     }
  //   });
  // }

}
