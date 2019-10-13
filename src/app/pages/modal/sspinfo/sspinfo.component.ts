import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sspinfo',
  templateUrl: './sspinfo.component.html',
  styleUrls: ['./sspinfo.component.scss'],
})
export class SspinfoComponent implements OnInit {

  sspinfo: FormGroup;
  constructor(
    private fb: FormBuilder,
    private func: FunctionService, 
    private modalCtrl: ModalController
  ) { 
    this.sspinfo = this.fb.group({
      peminta: ['', ],
    })
  }

  ngOnInit() {}

  Laporan(val){
    this.func.sspInfo = val;
    localStorage.setItem('sspinfo', JSON.stringify(this.func.sspInfo));
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
