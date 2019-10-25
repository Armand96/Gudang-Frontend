import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from 'src/app/core/event-emitter.service';
import { ModalController } from '@ionic/angular';
import { ListBarangModalComponent } from 'src/app/pages/modal/list-barang-modal/list-barang-modal.component';

@Component({
  selector: 'app-barangmasukcreate',
  templateUrl: './barangmasukcreate.component.html',
  styleUrls: ['./barangmasukcreate.component.scss'],
})
export class BarangmasukcreateComponent implements OnInit {

  barangbarumasuk: FormGroup
  NomorBarang: any;
  valaudit;

  constructor(
    private func: FunctionService,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private eventEmitter: EventEmitterService,
    private ModalCtrl: ModalController
  ) {
    this.barangbarumasuk = this.fb.group({
      no_bapm: ['', Validators.required],
      asal_barang: ['', Validators.required],
      no_kontrak: ['', Validators.required],
      nomor_barang: ['', Validators.required],
      // array_barang: this.fb.array([this.nomorBarangField()]),
      jml_msk_angka: ['', Validators.required],
      jml_msk_huruf: ['', Validators.required],
      keterangan: ['', Validators.required],
      // arrs: this.fb.array([this.addfield()])
    })
  }

  nomorBarangField() {
    return this.fb.group({
      nomor_barang: ['', Validators.required],
      jml_msk_angka: ['', Validators.required],
      jml_msk_huruf: ['', Validators.required],
    });
    // return this.fb.control('', Validators.required);
  }

  addMoreField() {
    this.Arrayz.push(this.nomorBarangField());
  }

  removeField() {
    this.Arrayz.removeAt(this.Arrayz.length - 1);
  }

  get Arrayz() {
    return <FormArray>this.barangbarumasuk.get('array_barang');
  }

  ngOnInit() {
    // this.loadNomorBarang();
  }

  async Tambah(val) {

    val.tgl_masuk = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (val.nomor_barang.nomor_barang != null || val.nomor_barang.nomor_barang != undefined) {
      val.nomor_barang = val.nomor_barang.nomor_barang;
    }

    this.func.postData(this.barangbarumasuk.value, 'barangmasukinsert').toPromise().then(
      async resp => {
        if (resp['success']) {
          await this.Audits(val);
          await this.updateStock(val);
        } else {
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      }
    );
  }

  Done() {
    this.eventEmitter.onFirstComponentButtonClick();
    this.router.navigateByUrl('/menu/barangmasuk');
  }

  async updateStock(val) {
    val.kuantitas = val.jml_msk_angka;
    await this.func.postData(val, 'barangupdateq').toPromise().then(
      async resp => {
        if (resp['success']) {
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.barangbarumasuk.controls['nomor_barang'].setValue('');
          this.barangbarumasuk.controls['jml_msk_angka'].setValue('');
          this.barangbarumasuk.controls['jml_msk_huruf'].setValue('');
        } else {
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      }
    )

  }

  async Audits(val) {

    val = JSON.stringify(val);
    await this.func.Audits('Barang Masuk', val, '').then(
      async resp => { }
    );
  }

  konversi(val) {
    this.barangbarumasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val));
  }

  async openModal() {
    const modal = await this.ModalCtrl.create({
      component: ListBarangModalComponent
    });
    modal.onDidDismiss().then(
      () => {
        this.barangbarumasuk.controls['nomor_barang'].setValue(this.func.brgSelected.nomor_barang);
      }
    );
    return await modal.present();
  }

  /*
  async loadNomorBarang() {
    await this.func.getDataWithoutParams("nomornamabarangonly").toPromise().then(
      resp => {
        if (resp['success']) {
          this.NomorBarang = resp['data'];
        }
      }
    );
  }

  async Tambah(val) {

    val.tgl_masuk = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.valaudit = {
      asal_barang: val.asal_barang,
      keterangan: val.keterangan,
      no_bapm: val.no_bapm,
      no_kontrak: val.no_kontrak,
      tgl_masuk: val.tgl_masuk
    }

    this.func.postData(this.barangbarumasuk.value, 'barangmasukinsertrepeat').toPromise().then(
      async resp => {
        if (resp['success']) {

          for (var el of val.array_barang) {
            this.valaudit.nomor_barang = el.nomor_barang;
            this.valaudit.jml_msk_angka = el.jml_msk_angka;
            this.valaudit.jml_msk_huruf = el.jml_msk_huruf;
            await this.Audits(this.valaudit);
            await this.updateStock(this.valaudit);
          }

          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/barangmasuk');

        } else {
          await this.func.presentToast("Data Gagal Disimpan", "text-center", "danger");
        }
      }
    );

  }

  async konversi(index) {
    var valangka = await this.Arrayz.controls[index].get('jml_msk_angka');
    var valhuruf = await this.Arrayz.controls[index].get('jml_msk_huruf');
    // console.log(val);
    // this.barangbarumasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val.jml_msk_angka));
    valhuruf.setValue(this.func.terbilang(valangka.value))
  }

  async openModal(index) {
    const modal = await this.ModalCtrl.create({
      component: ListBarangModalComponent
    });
    modal.onDidDismiss().then(
      () => {
        this.Arrayz.controls[index].get('nomor_barang').setValue(this.func.brgSelected.nomor_barang) //.setValue(this.func.brgSelected.nomor_barang);
      }
    );
    return await modal.present();
  }*/

  
}
