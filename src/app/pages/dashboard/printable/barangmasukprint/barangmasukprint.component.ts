import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-barangmasukprint',
  templateUrl: './barangmasukprint.component.html',
  styleUrls: ['./barangmasukprint.component.scss'],
})
export class BarangmasukprintComponent implements OnInit {

  data
  sendparam
  datenow = new Date();

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'print_brgmsk',
    options: {
      jsPDF: {
        orientation: 'landscape',
      },
    }
  };

  constructor(
    private func: FunctionService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    // console.log(this.func.TransferDataBrgMsk)
    this.loadData();
  }

  loadData(){
    this.sendparam = this.func.TransferDataBrgMsk
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.data = resp['data'];
          var i = 1;
          this.data.arraydata.forEach(element => {
            element.indexx = i;
            i++
          });
        }
      }
    );
  }

  onClick(){
    this.func.tableToExcel(document.getElementById('mytable'), 'Barang Masuk');
  }

  print(){
    
    this.exportAsService.save(this.config, 'Barang Masuk').toPromise().then(() => {
      // save started
    });

  }

}
