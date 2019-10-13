import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { FunctionService } from 'src/app/core/function.service';

@Component({
  selector: 'app-sspprint',
  templateUrl: './sspprint.component.html',
  styleUrls: ['./sspprint.component.scss'],
})
export class SspprintComponent implements OnInit {

  p;
  data
  sendparam
  datenow = new Date();
  maxItem:number = 10;

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'print_div',
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
    this.loadData();
  }

  loadData() {
    this.sendparam = this.func.TransferSPP
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp => {
        if (resp['success'] && resp['data'] != null) {
          this.data = resp['data'];

          var i = 1;
          this.data.arraydata.forEach(element => {
            element.indexx = i;
            i++
            element.huruf = this.func.terbilang(element.jml_diminta);
          });

          var sisa = this.data.arraydata.length % 10;
          if (sisa < this.maxItem) {
            for (i = sisa; i < this.maxItem; i++) {
              this.data.arraydata.push(this.emptyObjPush());
            }
          }
        }
      }
    );
  }

  emptyObjPush() {
    var object = {
      nomor_barang: 'none',
      huruf: 'none',
    }
    return object;
  }

  print() {

    this.exportAsService.save(this.config, 'SPP').toPromise().then(() => {
      // save started
    });

  }

  onClick() {
    this.func.tableToExcel(document.getElementById('mytable'), 'SPP');
  }

}
