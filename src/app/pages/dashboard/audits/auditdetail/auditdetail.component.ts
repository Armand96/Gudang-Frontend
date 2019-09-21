import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';

@Component({
  selector: 'app-auditdetail',
  templateUrl: './auditdetail.component.html',
  styleUrls: ['./auditdetail.component.scss'],
})
export class AuditdetailComponent implements OnInit {

  auditdetail
  auditid = this.actr.snapshot.params['id'];
  nilai_lama
  nilai_baru

  constructor(
    private actr: ActivatedRoute,
    private func: FunctionService
  ) { }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail(){
    await this.func.getDataWithParams(this.auditid, 'auditsingle/').toPromise().then(
      resp => {
        if (resp['success'] && resp['data'] != null){
          this.auditdetail = resp['data'];

          if (this.auditdetail.nilai_lama != '') {
            this.nilai_lama = JSON.parse(this.auditdetail.nilai_lama);
            if (this.nilai_lama.harga_satuan != null) delete this.nilai_lama.harga_satuan
            // Object.keys(this.nilai_lama).forEach( (item) =>{
            // });
          }
          
          if (this.auditdetail.nilai_baru != '') {
            this.nilai_baru = JSON.parse(this.auditdetail.nilai_baru);
            if (this.nilai_baru.harga_satuan != null) delete this.nilai_baru.harga_satuan;
            // Object.keys(this.nilai_baru).forEach( (item) =>{
            // });
          }
          
        }
      }
    )
  }

}
