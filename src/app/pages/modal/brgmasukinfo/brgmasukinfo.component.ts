import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brgmasukinfo',
  templateUrl: './brgmasukinfo.component.html',
  styleUrls: ['./brgmasukinfo.component.scss'],
})
export class BrgmasukinfoComponent implements OnInit {

  brgmasukinfo: FormGroup;
  constructor(
    private fb: FormBuilder,
    private func: FunctionService, 
    private modalCtrl: ModalController
  ) {
    this.brgmasukinfo = this.fb.group({
      pemberi: ['', ],
      penerima: ['', ],
    })
   }
  ngOnInit() {}

  Laporan(val){
    this.func.brgMasukInfo = val;
    localStorage.setItem('brgmasukinfo', JSON.stringify(this.func.brgMasukInfo));
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
}
