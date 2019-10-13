import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-barangmasukprint',
  templateUrl: './barangmasukprint.component.html',
  styleUrls: ['./barangmasukprint.component.scss'],
})
export class BarangmasukprintComponent implements OnInit {

  p;
  data
  sendparam
  datenow = new Date();
  maxItem:number = 10;

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

  loadData() {
    this.sendparam = this.func.TransferDataBrgMsk
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp => {
        if (resp['success'] && resp['data'] != null) {
          this.data = resp['data'];

          var i = 1;
          this.data.arraydata.forEach(element => {
            element.indexx = i;
            i++
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
      nama_barang: 'none',
      satuan: 'none',
      jml_klr_angka: 'none',
      jml_klr_huruf: 'none',
      jml_klr_permintaan_angka: 'none',
      jml_klr_permintaan_huruf: 'none',
    }
    return object;
  }

  onClick() {
    this.func.tableToExcel(document.getElementById('mytable'), 'Barang Masuk');
  }

  print() {

    this.exportAsService.save(this.config, 'Barang Masuk').toPromise().then(() => {
      // save started
    });

  }

}
