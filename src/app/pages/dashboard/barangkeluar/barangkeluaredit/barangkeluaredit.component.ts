import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

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
  NomorBarang;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private actr: ActivatedRoute,
    private eventEmitter: EventEmitterService
  ) { 
    this.barangbarukeluar = this.fb.group({
      proyek: ['', Validators.required],
      no_order: ['', Validators.required],
      bengkel: ['', Validators.required],
      pekerjaan: ['', Validators.required],
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
    this.loadSingleBarang();
    this.loadNomorBarang();
    this.editmode = false;
  }

  loadSingleBarang(){
    var subs = this.func.getDataWithParams(this.id,'barangkeluarsingle/').subscribe(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];

          this.barangbarukeluar.controls['proyek'].setValue(this.old_value.proyek);
          this.barangbarukeluar.controls['no_order'].setValue(this.old_value.no_order);
          this.barangbarukeluar.controls['bengkel'].setValue(this.old_value.bengkel);
          this.barangbarukeluar.controls['pekerjaan'].setValue(this.old_value.pekerjaan);
          this.barangbarukeluar.controls['kode_pekerjaan'].setValue(this.old_value.kode_pekerjaan);
          this.barangbarukeluar.controls['tgl_keluar'].setValue(this.old_value.tgl_keluar);
          this.barangbarukeluar.controls['nomor_barang'].setValue(this.old_value.nomor_barang);
          this.barangbarukeluar.controls['jml_klr_angka'].setValue(this.old_value.jml_klr_angka);
          this.barangbarukeluar.controls['jml_klr_huruf'].setValue(this.old_value.jml_klr_huruf);
          this.barangbarukeluar.controls['jml_klr_permintaan_angka'].setValue(this.old_value.jml_klr_permintaan_angka);
          this.barangbarukeluar.controls['jml_klr_permintaan_huruf'].setValue(this.old_value.jml_klr_permintaan_huruf);
        }
        subs.unsubscribe();
      }
    );
  }

  Simpan(val){
    // console.log(val);
    val.id = this.id;
    var subs = this.func.postData(val, "barangkeluarupdate").subscribe(
      async resp=>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary", 3000);
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl("/menu/barangkeluar");
        }
        subs.unsubscribe();
      }
    );
  }

  loadNomorBarang(){
    var subs = this.func.getDataWithoutParams("nomornamabarangonly").subscribe(
      resp => {
        if (resp['success']){
          this.NomorBarang = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  konversi(val){
    this.barangbarukeluar.controls['jml_klr_huruf'].setValue(this.func.terbilang(val));
  }

  konversi2(val){
    this.barangbarukeluar.controls['jml_klr_permintaan_huruf'].setValue(this.func.terbilang(val));
  }

}
