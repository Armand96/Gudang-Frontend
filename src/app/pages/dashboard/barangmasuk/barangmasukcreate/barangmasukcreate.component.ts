import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barangmasukcreate',
  templateUrl: './barangmasukcreate.component.html',
  styleUrls: ['./barangmasukcreate.component.scss'],
})
export class BarangmasukcreateComponent implements OnInit {

  barangbarumasuk:FormGroup
  constructor(
    private func:FunctionService,
    private fb:FormBuilder,
    private router: Router
  ) {
    this.barangbarumasuk = this.fb.group({
      asal_barang: ['', Validators.required],
      no_kontrak: ['', Validators.required],
      tgl_masuk: [, Validators.required],
      nomor_barang: ['', Validators.required],
      jml_msk_angka: ['', Validators.required],
      jml_msk_huruf: ['', Validators.required],
      keterangan: ['', Validators.required],
    })
  }

  ngOnInit() {}

  Tambah(val){
    
    console.log(val)
    // var subs = this.func.postData(val, 'barangmasukinsert').subscribe(
    //   async resp =>{
    //     if (resp['success']){
    //       await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
    //       this.router.navigateByUrl('/menu/barangmasuk');
          
    //     }
    //     subs.unsubscribe();
    //   }
    // )
    
  }
}
