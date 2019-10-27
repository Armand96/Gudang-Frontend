import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-nomorbarangmasuk',
  templateUrl: './nomorbarangmasuk.component.html',
  styleUrls: ['./nomorbarangmasuk.component.scss'],
})
export class NomorbarangmasukComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  nmrBarang:Array<any>;
  nomor_barang;
  list_nomor_barang;
  landscape:Boolean;
  screenEvent;
  subsEvent;

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
        this.loadNomorBarang();
      });    
    }
    this.loadNomorBarang();
  }

  loadNomorBarang(){
    this.func.getDataWithoutParams('nmrdisbarangmasuk').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.nmrBarang = resp['data'];
        }
      }
    )
    if (this.nomor_barang != null) this.onChange();
  }

  save(){
    var datas = this.list_nomor_barang.arraydata.filter( (props) =>{
      delete props.id;
      return true;
    });
    this.func.exportAsExcelFile(datas, "Barang Masuk Berdasarkan Nomor Barang "+this.nomor_barang.nomor_barang + " - "+ this.nomor_barang.nama_barang);
  }

  async onChange(){
    await this.func.delay(50);
    var jsonsend = {
      nomor_barang:this.nomor_barang.nomor_barang
    }
    
    this.func.postData(jsonsend, 'nomorbarangmasuk').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_nomor_barang = resp['data'];
          // console.log(this.list_nomor_barang);
        }
      }
    )
  }

}
