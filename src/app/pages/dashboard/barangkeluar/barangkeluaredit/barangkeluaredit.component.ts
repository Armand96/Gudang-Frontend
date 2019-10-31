import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { ListBarangModalComponent } from 'src/app/pages/modal/list-barang-modal/list-barang-modal.component';

@Component({
  selector: 'app-barangkeluaredit',
  templateUrl: './barangkeluaredit.component.html',
  styleUrls: ['./barangkeluaredit.component.scss'],
})
export class BarangkeluareditComponent implements OnInit {

  barangbarukeluar:FormGroup
  editmode:Boolean = false;
  id = this.actr.snapshot.params['id'];
  old_value;
  bengkelarray;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private actr: ActivatedRoute,
    private eventEmitter: EventEmitterService,
    private dpipe: DatePipe,
    private ModalCtrl: ModalController
  ) { 
    this.barangbarukeluar = this.fb.group({
      no_spm: ['', Validators.required],
      proyek: ['', Validators.required],
      no_order: ['', Validators.required],
      bengkel: ['', Validators.required],
      // pekerjaan: ['', Validators.required],
      kode_pekerjaan: ['', Validators.required],
      tgl_keluar: [, Validators.required],
      nomor_barang: ['', Validators.required],
      jml_klr_angka: ['', Validators.required],
      jml_klr_huruf: ['', Validators.required],
      jml_klr_permintaan_angka: ['', Validators.required],
      jml_klr_permintaan_huruf: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadBengkel();
    this.loadSingleBarang();
    this.editmode = false;
    
  }
  async loadBengkel(){
    await this.func.getDataWithoutParams('bengkelall').toPromise().then(
      resp => {
        if (resp['success']){
          this.bengkelarray = resp['data'];
        }
      }
    );
  }

  async loadSingleBarang(){
    await this.func.getDataWithParams(this.id,'barangkeluarsingle/').toPromise().then(
      async resp => {
        if (resp['success']){
          this.old_value = await resp['data'];
          console.log(this.old_value);
          this.barangbarukeluar.controls['no_spm'].setValue(this.old_value.no_spm);
          this.barangbarukeluar.controls['proyek'].setValue(this.old_value.proyek);
          this.barangbarukeluar.controls['no_order'].setValue(this.old_value.no_order);
          this.barangbarukeluar.controls['bengkel'].setValue(this.old_value.bengkel);
          // this.barangbarukeluar.controls['pekerjaan'].setValue(this.old_value.pekerjaan);
          this.barangbarukeluar.controls['kode_pekerjaan'].setValue(this.old_value.kode_pekerjaan);
          this.barangbarukeluar.controls['tgl_keluar'].setValue(this.old_value.tgl_keluar);
          this.barangbarukeluar.controls['nomor_barang'].setValue(this.old_value.nomor_barang);
          this.barangbarukeluar.controls['jml_klr_angka'].setValue(this.old_value.jml_klr_angka);
          this.barangbarukeluar.controls['jml_klr_huruf'].setValue(this.old_value.jml_klr_huruf);
          this.barangbarukeluar.controls['jml_klr_permintaan_angka'].setValue(this.old_value.jml_klr_permintaan_angka);
          this.barangbarukeluar.controls['jml_klr_permintaan_huruf'].setValue(this.old_value.jml_klr_permintaan_huruf);
        }
        
      }
    );
  }

  async openModalNmr() {
    const modal = await this.ModalCtrl.create({
      component: ListBarangModalComponent
    });
    modal.onDidDismiss().then(
      () => {
        this.barangbarukeluar.controls['nomor_barang'].setValue(this.func.brgSelected.nomor_barang);
      }
    );
    return await modal.present();
  }

  async Simpan(val){
    // console.log(val);
    val.tgl_keluar = this.dpipe.transform(val.tgl_keluar, 'yyyy-MM-dd HH:mm:ss');
    val.id = this.id;
    await this.func.postData(val, "barangkeluarupdate").toPromise().then(
      async resp=>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl("/menu/barangkeluar");
          // this.func.backClicked();
        }
      }
    );
    await this.updateStock(val);
    await this.Audits(val);
  }

  async updateStock(valnew) {

    var selisih = valnew.jml_klr_angka - this.old_value.jml_klr_angka;
    if (valnew.nomor_barang == this.old_value.nomor_barang) {
      // console.log('nomor barang sama');
      if (selisih != 0){
        valnew.kuantitas = selisih * -1;
        await this.func.postData(valnew, 'barangupdateq').toPromise().then(
          async resp => {
            if(resp['success']){
              await this.func.presentToast("Data Berhasil Diedit", "text-center", "primary");
              this.eventEmitter.onFirstComponentButtonClick();
              this.router.navigateByUrl('/menu/barangkeluar');
            }
          }
        );
      }

    } else {
      // console.log('nomor barang tidak sama');
      this.old_value.kuantitas = -this.old_value.jml_klr_angka * -1;
      await this.func.postData(this.old_value, 'barangupdateq').toPromise().then(
        async resp => {
          if(resp['success']){
            valnew.kuantitas = -valnew.jml_klr_angka;
            await this.func.postData(valnew, 'barangupdateq').toPromise().then(
              async resp => {
                if(resp['success']){
                  await this.func.presentToast("Data Berhasil Diedit", "text-center", "primary");
                  this.eventEmitter.onFirstComponentButtonClick();
                  this.router.navigateByUrl('/menu/barangkeluar');
                }
              }
            );

          }
        }
      );
      

    }
  }

  async Audits(val){
    
    var oldval = JSON.stringify(this.old_value);
    val = JSON.stringify(val);
    await this.func.Audits('Edit Barang Keluar', val, oldval).then(
      async resp => { return true }
    );

  }

  konversi(val){
    this.barangbarukeluar.controls['jml_klr_huruf'].setValue(this.func.terbilang(val));
  }

  konversi2(val){
    this.barangbarukeluar.controls['jml_klr_permintaan_huruf'].setValue(this.func.terbilang(val));
  }

}
