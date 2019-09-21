import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/core/function.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-brgkeluarinfo',
  templateUrl: './brgkeluarinfo.component.html',
  styleUrls: ['./brgkeluarinfo.component.scss'],
})
export class BrgkeluarinfoComponent implements OnInit {

  brgkeluarinfo: FormGroup;
  constructor(
    private fb: FormBuilder,
    private func: FunctionService, 
    private modalCtrl: ModalController
  ) {
    this.brgkeluarinfo = this.fb.group({
      man: ['', ],
      renwas: ['', ],
      kabid: ['', ],
      kabeng: ['', ],
      penerima: ['', ],
      pemberi: ['', ],
    })
   }

  ngOnInit() {}

  Laporan(val){
    this.func.brgKeluarInfo = val;
    localStorage.setItem('brgkeluarinfo', JSON.stringify(this.func.brgKeluarInfo));
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
