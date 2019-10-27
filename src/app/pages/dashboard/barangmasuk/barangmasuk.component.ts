import { Component, OnInit, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform, AlertController } from '@ionic/angular';
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
    private eventEmitterService:EventEmitterService,
    private alertController: AlertController
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

  async updateStock(val){
    await this.func.postData(val, 'barangupdateq').toPromise().then();
  }

  async Audits(oldval){
    oldval = JSON.stringify(oldval);
    await this.func.Audits('Hapus Barang Masuk', '', oldval).then();
  }

  async presentAlertConfirm(val) {
    val.kuantitas = -val.jml_msk_angka;
    const alert = await this.alertController.create({
      header: 'Perhatian!',
      message: 'Anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ya',
          handler: async () => {
            await this.func.getDataWithParams(val.id, 'barangmasukdelete/').toPromise().then(
              async resp => {
                if (resp['success']){
                  await this.updateStock(val);
                  await this.Audits(val);
                  this.func.presentToast('Data berhasil dihapus', 'text-center', 'success');
                  await this.reinit();
                }
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async descktop() {
    await this.func.getDataWithoutParams('barangmasukshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
          // console.log(this.data);
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

}
