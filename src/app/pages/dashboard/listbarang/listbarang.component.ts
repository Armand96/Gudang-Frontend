import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listbarang',
  templateUrl: './listbarang.component.html',
  styleUrls: ['./listbarang.component.scss'],
})
export class ListbarangComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.subsEvent.unsubscribe();
    this.screenEvent.unsubscribe();
  }
  
  subsEvent;
  screenEvent; 

  // dtOptions: DataTables.Settings = {};
  isLandScape:Boolean;
  data;
  temp = [];

  constructor(
    // private router:Router, 
    // private renderer:Renderer, 
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService
  ) {}

  // ========================== FILTER 
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

  // ======================== INIT
  public ngOnInit() {
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

  // ====================== EXPORT AS EXCEL
  exportAsXLSX():void {
    this.data = this.data.filter( (props) =>{
      delete props.dibuat_oleh;
      return true;
    });
    this.func.exportAsExcelFile(this.data, "Daftar Barang");
  }

  testTable(){
    var wb = XLSX.utils.table_to_book(document.getElementById('mytable'));
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    this.func.saveAsExcelFile(this.saveexcel(wbout), 'Test') ;
  }

  saveexcel(s){
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  async LoadData(){
    await this.func.getDataWithoutParams('barangshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
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
