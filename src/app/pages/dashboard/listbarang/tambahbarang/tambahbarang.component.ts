import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';


@Component({
  selector: 'app-tambahbarang',
  templateUrl: './tambahbarang.component.html',
  styleUrls: ['./tambahbarang.component.scss'],
})
export class TambahbarangComponent implements OnInit {

  barangbaru: FormGroup;
  fileData: File = null;
  previewUrl:any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService,
    private eventEmitter: EventEmitterService
  ) {
    this.barangbaru = this.fb.group({
      nomor_barang: ['', Validators.required],
      nama_barang: ['', Validators.required],
      satuan: ['', Validators.required],
      // kuantitas: ['', Validators.required],
      harga_satuan: ['', Validators.required],
      foto: [''],
    })
   }

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.func.plat.isPortrait();
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  Tambah(val){
    
    var frmData = new FormData();
    frmData.append('nama_barang', val.nama_barang);
    frmData.append('nomor_barang', val.nomor_barang);
    frmData.append('satuan', val.satuan);
    frmData.append('kuantitas', "0");
    frmData.append('harga_satuan', val.harga_satuan);
    frmData.append('dibuat_oleh', this.func.user);
    frmData.append('foto', this.fileData );

    val.dibuat_oleh = this.func.user;
    val.kuantitas = 0;
    val.foto = this.fileData.name.replace(' ', '_');
    
    console.log(val); 
    
    this.func.postData(frmData, 'baranginsert').toPromise().then(
      async resp =>{
        console.log(resp);
        if (resp['success']){
          await this.Audits(val);
        }
      }
    )
    
  }

  async Audits(val){
    
    val = JSON.stringify(val);
    await this.func.Audits('Tambah Barang', val, '').then(
      async resp => {
        if (resp['success']){
          await this.func.presentToast("Data Berhasil Disimpan", "text-center", "primary");
          this.eventEmitter.onFirstComponentButtonClick();
          this.router.navigateByUrl('/menu/barang');
        }
      }
    );
  }

}
