import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';


@Component({
  selector: 'app-tambahbarang',
  templateUrl: './tambahbarang.component.html',
  styleUrls: ['./tambahbarang.component.scss'],
})
export class TambahbarangComponent implements OnInit {

  barangbaru: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService
  ) {
    this.barangbaru = this.fb.group({
      nomor_barang: ['', Validators.required],
      nama_barang: ['', Validators.required],
      satuan: ['', Validators.required],
      kuantitas: ['', Validators.required],
      harga_satuan: ['', Validators.required],
    })
   }

  ngOnInit() {}

  Tambah(val){
    
    val.dibuat_oleh = this.func.user;
    var subs = this.func.postData(val, 'baranginsert').subscribe(
      async resp =>{
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.router.navigateByUrl('/menu/barang');
        }
        subs.unsubscribe();
      }
    )
    
  }

}