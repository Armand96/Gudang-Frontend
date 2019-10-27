import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform, AlertController } from '@ionic/angular';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-barangkeluar',
  templateUrl: './barangkeluar.component.html',
  styleUrls: ['./barangkeluar.component.scss'],
})
export class BarangkeluarComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.subsEvent.unsubscribe();
    this.screenEvent.unsubscribe();
  }

  subsEvent;
  screenEvent; 

  landscape:Boolean;
  data;
  temp = [];

  constructor( 
    private func:FunctionService,
    private plat:Platform,
    private eventEmitterService:EventEmitterService,
    private alertController:AlertController 
  ) {}

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
      return ['proyek', 'no_order', 'no_spm', 'kode_pekerjaan', 'tgl_keluar', 'jml_klr_angka'].some(
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
    this.func.exportAsExcelFile(this.data, "Daftar Barang Keluar");
  }

  async descktop() {
    await this.func.getDataWithoutParams('barangkeluarshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
        
      }
    );
    // await this.func.getDataWithoutParams('barangkeluardis').toPromise().then(
    //   resp => {
    //     if (resp['success']){
    //       this.data = resp['data'];
    //     }
        
    //   }
    // );
  }

  async updateStock(val){
    await this.func.postData(val, 'barangupdateq').toPromise().then();
  }

  async Audits(oldval){
    oldval = JSON.stringify(oldval);
    await this.func.Audits('Hapus Barang Keluar', '', oldval).then();
  }

  async presentAlertConfirm(val) {
    val.kuantitas = val.jml_klr_angka;
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
            await this.func.getDataWithParams(val.id, 'barangkeluardelete/').toPromise().then(
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

}
