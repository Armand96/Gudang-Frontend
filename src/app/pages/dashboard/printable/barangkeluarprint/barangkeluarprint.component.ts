import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-barangkeluarprint',
  templateUrl: './barangkeluarprint.component.html',
  styleUrls: ['./barangkeluarprint.component.scss'],
})
export class BarangkeluarprintComponent implements OnInit {

  data
  sendparam
  p
  maxItem: number = 30;
  fillarray = [];

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'print_div',
    options: {
      jsPDF: {
        orientation: 'landscape',
      },
    }
  };


  @ViewChild('print_div') content: ElementRef;

  // printCSS = ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'];

  constructor(
    private elRef: ElementRef,
    private func: FunctionService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    // console.log(this.func.TransferDataBrgKlr)
    this.loadData();
  }

  loadData() {
    this.sendparam = this.func.TransferDataBrgKlr
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp => {
        // console.log(resp['data'])
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

  print() {

    this.exportAsService.save(this.config, 'Barang Keluar').toPromise().then(() => {
      // save started
    });

  }

  onClick() {
    this.func.tableToExcel(document.getElementById('mytable'), 'Barang Keluar');
  }

}
