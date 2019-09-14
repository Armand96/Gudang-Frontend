import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

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
    private router: Router,
    private func: FunctionService,
    private actr: ActivatedRoute,
    private eventEmitter: EventEmitterService
  ) { 
    this.editbarangmasuk = this.fb.group({
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
    this.loadNomorBarang();
    this.editmode = false;
  }

  loadSingleBarang(){
    var subs = this.func.getDataWithParams(this.id,'barangmasuksingle/').subscribe(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];

          this.editbarangmasuk.controls['asal_barang'].setValue(this.old_value.asal_barang);
          this.editbarangmasuk.controls['no_kontrak'].setValue(this.old_value.no_kontrak);
          this.editbarangmasuk.controls['tgl_masuk'].setValue(this.old_value.tgl_masuk);
          this.editbarangmasuk.controls['nomor_barang'].setValue(this.old_value.nomor_barang);
          this.editbarangmasuk.controls['jml_msk_angka'].setValue(this.old_value.jml_msk_angka);
          this.editbarangmasuk.controls['jml_msk_huruf'].setValue(this.old_value.jml_msk_huruf);
          this.editbarangmasuk.controls['keterangan'].setValue(this.old_value.keterangan);
        }
        subs.unsubscribe();
      }
    );
  }

  Simpan(val){
    // console.log(val);
    val.id = this.id;
    var subs = this.func.postData(val, "barangmasukupdate").subscribe(
      async resp=>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl("/menu/barangmasuk");
        }
        subs.unsubscribe();
      }
    );
  }

  loadNomorBarang(){
    var subs = this.func.getDataWithoutParams("nomorbarangonly").subscribe(
      resp => {
        if (resp['success']){
          this.NomorBarang = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  konversi(val){
    this.editbarangmasuk.controls['jml_msk_huruf'].setValue(this.func.terbilang(val.jml_msk_angka));
  }

}
