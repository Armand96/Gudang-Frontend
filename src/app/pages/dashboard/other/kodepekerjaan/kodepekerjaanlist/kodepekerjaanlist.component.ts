import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform, AlertController } from '@ionic/angular';
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
    private eventEmitterService:EventEmitterService,
    private alertController:AlertController
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

  async Audits(oldval){
    oldval = JSON.stringify(oldval);
    await this.func.Audits('Hapus Kode Pekerjaan', '', oldval).then();
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
            await this.func.postData(val, 'kodepekerjaanrdelete').toPromise().then(
              async resp => {
                if (resp['success']){
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
