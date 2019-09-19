import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';

@Component({
  selector: 'app-barangmasukprint',
  templateUrl: './barangmasukprint.component.html',
  styleUrls: ['./barangmasukprint.component.scss'],
})
export class BarangmasukprintComponent implements OnInit {

  data
  sendparam

  constructor(
    private func: FunctionService
  ) { }

  ngOnInit() {
    console.log(this.func.TransferDataBrgMsk)
    this.loadData();
  }

  loadData(){
    this.sendparam = this.func.TransferDataBrgMsk
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.data = resp['data'];
        }
      }
    );
  }

  onClick(){
    this.func.tableToExcel(document.getElementById('mytable'), 'Barang Masuk');
  }

}
