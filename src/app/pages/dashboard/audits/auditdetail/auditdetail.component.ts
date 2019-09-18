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
  nilai_baru:Object

  constructor(
    private actr: ActivatedRoute,
    private func: FunctionService
  ) { }

  ngOnInit() {
    this.loadDetail();
  }

  async loadDetail(){
    await this.func.getDataWithParams(this.auditid, 'auditsingle/').toPromise().then(
      resp => {
        if (resp['success'] && resp['data'] != null){
          this.auditdetail = resp['data'];

          if (this.auditdetail.nilai_lama != '') {
            this.nilai_lama = JSON.parse(this.auditdetail.nilai_lama);
            // Object.keys(this.nilai_lama).forEach( (item) =>{
            // });
          }
          
          if (this.auditdetail.nilai_baru != '') {
            this.nilai_baru = JSON.parse(this.auditdetail.nilai_baru);
            // Object.keys(this.nilai_baru).forEach( (item) =>{
            // });
          }
          
        }
      }
    )
  }

}
