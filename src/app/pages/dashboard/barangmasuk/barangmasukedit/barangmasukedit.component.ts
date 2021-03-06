import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { ListBarangModalComponent } from 'src/app/pages/modal/list-barang-modal/list-barang-modal.component';

@Component({
  selector: 'app-barangmasukedit',
  templateUrl: './barangmasukedit.component.html',
  styleUrls: ['./barangmasukedit.component.scss'],
})
export class BarangmasukeditComponent implements OnInit {

  editbarangmasuk:FormGroup
  editmode:Boolean = false;
  id = this.actr.snapshot.params['id'];
  old_value;
  NomorBarang;

  constructor(
    private fb: FormBuilder,
    private func: FunctionService,
    private actr: ActivatedRoute,
    private eventEmitter: EventEmitterService,
    // private router: Router,
    private dpipe: DatePipe,
    private ModalCtrl: ModalController
  ) { 
    this.editbarangmasuk = this.fb.group({
      no_bapm: ['', Validators.required],
      asal_barang: ['', Validators.required],
      no_kontrak: ['', Validators.required],
      tgl_masuk: [, Validators.required],
      nomor_barang: ['', Validators.required],
      jml_msk_angka: ['', Validators.required],
      jml_msk_huruf: ['', Validators.required],
      keterangan: ['', Validators.required],
    })
   }

  ngOnInit() {
    this.loadSingleBarang();
    this.editmode = false;
  }

  async loadSingleBarang(){
    await this.func.getDataWithParams(this.id,'barangmasuksingle/').toPromise().then(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'][0];
          this.editbarangmasuk.controls['no_bapm'].setValue(this.old_value.no_bapm);
          this.editbarangmasuk.controls['asal_barang'].setValue(this.old_value.asal_barang);
          this.editbarangmasuk.controls['no_kontrak'].setValue(this.old_value.no_kontrak);
          this.editbarangmasuk.controls['tgl_masuk'].setValue(this.old_value.tgl_masuk);
          this.editbarangmasuk.controls['nomor_barang'].setValue(this.old_value.nomor_barang);
          this.editbarangmasuk.controls['jml_msk_angka'].setValue(this.old_value.jml_msk_angka);
          this.editbarangmasuk.controls['jml_msk_huruf'].setValue(this.old_value.jml_msk_huruf);
          this.editbarangmasuk.controls['keterangan'].setValue(this.old_value.keterangan);
        }
      }
    );
  }

  async Simpan(val){
    // console.log(val);
    val.tgl_masuk = this.dpipe.transform(val.tgl_masuk, 'yyyy-MM-dd HH:mm:ss');
    val.id = this.id;
    await this.func.postData(val, "barangmasukupdate").toPromise().then(
      async resp=>{
        if (resp['success']){
          await this.updateStock(val);
          await this.Audits(val);
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
          this.eventEmitter.onFirstComponentButtonClick();
          // this.router.navigateByUrl("/menu/barangmasuk");
          this.func.backClicked();
        }
      }
    );
  }

  async Audits(val){
    
    var oldval = JSON.stringify(this.old_value);
    val = JSON.stringify(val);
    await this.func.Audits('Edit Barang Masuk', val, oldval).then();

  }

  async updateStock(valnew) {
    
    var selisih = valnew.jml_msk_angka - this.old_value.jml_msk_angka;
    if (valnew.nomor_barang == this.old_value.nomor_barang) {
      // console.log('nomor barang sama');
      if (selisih != 0){
        valnew.kuantitas = selisih;
        await this.func.postData(valnew, 'barangupdateq').toPromise().then();
      }

    } else {
      // console.log('nomor barang tidak sama');
      this.old_value.kuantitas = -this.old_value.jml_msk_angka;
      await this.func.postData(this.old_value, 'barangupdateq').toPromise().then(
        async resp => {
          if(resp['success']){
            valnew.kuantitas = valnew.jml_msk_angka;
            await this.func.postData(valnew, 'barangupdateq').toPromise().then();

          }
        }
      );
      

    }
  }

  async openModal() {
    const modal = await this.ModalCtrl.create({
      component: ListBarangModalComponent
    });
    modal.onDidDismiss().then(
      () => {
        this.editbarangmasuk.controls['nomor_barang'].setValue(this.func.brgSelected.nomor_barang);
      }
    );
    return await modal.present();
  }

  konversi(val){
    this.editbarangmasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val.jml_msk_angka));
  }

}
