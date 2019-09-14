import { Component, OnInit, Renderer, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-listbarang',
  templateUrl: './listbarang.component.html',
  styleUrls: ['./listbarang.component.scss'],
})
export class ListbarangComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    console.log("DESTROYYED");
    this.eventEmitterService.invokeFirstComponentFunction.unsubscribe();
    this.func.landscape.unsubscribe();
  }
  
  dtOptions: DataTables.Settings = {};
  isLandScape:Boolean;
  data;
  temp = [];

  constructor(
    // private router:Router, 
    // private renderer:Renderer, 
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService
  ) {
    this.func.landscape.subscribe(
      resp=>{
        this.isLandScape = resp;
      }
    )
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((o)=>{
      return ['nomor_barang', 'nama_barang', 'satuan', 'kuantitas', 'harga_satuan'].some(
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

  public ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {  
        this.reinit();
      });    
    }
    this.reinit();
  }

  async reinit(){
    this.func.landscape.next(this.plat.isLandscape());
    (this.func.landscape) ? this.descktop() : this.mobile();
    await this.func.delay(1000);
    this.temp = [...this.data];
  }

  mobile(){
    var subs = this.func.getDataWithoutParams('barangshowall').subscribe(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
          console.log(this.data);
        }
        subs.unsubscribe();
      }
    );
  }

  descktop(){
    var subs = this.func.getDataWithoutParams('barangshowall').subscribe(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  // desktop(){
  //   console.log("jalan");
  //   this.dtOptions = {
  //     ajax: {
  //       url:this.func.url+"barangshowall",
  //       type:"GET",
  //       headers: this.func.dtHeaders
  //     },
  //     serverSide:false,
  //     columnDefs:[
  //       {"className": "dt-center", "targets": "_all"}
  //     ],
  //     columns: [
  //       {data:"nomor_barang"},
  //       {data:"nama_barang"},
  //       {data:"satuan"},
  //       {data:"kuantitas"},
  //       {
  //         data:"harga_satuan",
  //         render: (data)=>{
  //           return "Rp " + (data/1000).toFixed(3);
  //         }
  //       },
  //       {
  //         data:"nomor_barang",
  //         render: function (data: any, type: any, full: any) {
  //           return '<ion-button detailnomor="'+data+'"> Detail </ion-button>';
  //         }
  //       },
  //     ]
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.renderer.listen('document', 'click', async (event) => {
  //     if (event.target.hasAttribute("detailnomor")) {
  //       await this.router.navigateByUrl("/menu/detailbarang/"+ event.target.getAttribute("detailnomor"));
  //     }
  //   });
  // }
}
