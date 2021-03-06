import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform, ModalController } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-list-barang-modal',
  templateUrl: './list-barang-modal.component.html',
  styleUrls: ['./list-barang-modal.component.scss'],
})
export class ListBarangModalComponent implements OnInit, OnDestroy {
  
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
    private eventEmitterService:EventEmitterService,
    private modalCtrl:ModalController
  ) { }

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

  selectData(index){
    // console.log(index);
    this.func.brgSelected = {
      nomor_barang:this.data[index].nomor_barang,
      nama_barang:this.data[index].nama_barang,
      satuan:this.data[index].satuan,
      kuantitas:this.data[index].kuantitas
    }
    localStorage.setItem('brgselected', JSON.stringify(this.func.brgSelected));
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async LoadData(){
    await this.func.getDataWithoutParams('barangshowall').toPromise().then(
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
