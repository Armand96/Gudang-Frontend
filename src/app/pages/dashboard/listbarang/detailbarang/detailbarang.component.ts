import { FunctionService } from 'src/app/core/function.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-detailbarang',
  templateUrl: './detailbarang.component.html',
  styleUrls: ['./detailbarang.component.scss'],
})
export class DetailbarangComponent implements OnInit {

  editbarang:FormGroup
  editmode:Boolean = false;
  nomor_barang = this.actr.snapshot.params['id'];
  jsonsend = {
    nomor_barang:this.nomor_barang
  }
  old_value;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private actr: ActivatedRoute,
    private eventEmitter: EventEmitterService
  ) { 
    this.editbarang = this.fb.group({
      nomor_barang: ['', Validators.required],
      nama_barang: ['', Validators.required],
      satuan: ['', Validators.required],
      kuantitas: ['', Validators.required],
      harga_satuan: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadSingleBarang();
    this.editmode = false;
  }

  async loadSingleBarang(){
    await this.func.postData(this.jsonsend, 'barangsingle').toPromise().then(
      resp => {
        if (resp['success']){
          this.old_value = resp['data'];

          this.editbarang.controls['nomor_barang'].setValue(this.old_value.nomor_barang);
          this.editbarang.controls['nama_barang'].setValue(this.old_value.nama_barang);
          this.editbarang.controls['satuan'].setValue(this.old_value.satuan);
          this.editbarang.controls['kuantitas'].setValue(this.old_value.kuantitas);
          this.editbarang.controls['harga_satuan'].setValue(this.old_value.harga_satuan);
        }
      }
    );
  }

  async editBarang(val){

    await this.func.postData(val, 'barangupdate').toPromise().then(
      async resp => {
        if (resp['success']){
          await this.Audits(val);
          await this.func.presentToast('Edit Berhasil', 'text-center', 'primary');
          this.router.navigateByUrl("menu/barang");
          this.eventEmitter.onFirstComponentButtonClick();
          // this.navctrl.navigateBack("/menu/barang");
        }
      }
    );
  }

  async Audits(val){
    delete this.old_value.dibuat_oleh;
    var oldval = JSON.stringify(this.old_value);
    val = JSON.stringify(val);
    await this.func.Audits('Edit Barang', val, oldval).then(
      async resp => { return true }
    );
  }
}
