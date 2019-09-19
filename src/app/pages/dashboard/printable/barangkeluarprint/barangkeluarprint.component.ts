import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { ENgxPrintComponent } from 'e-ngx-print';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-barangkeluarprint',
  templateUrl: './barangkeluarprint.component.html',
  styleUrls: ['./barangkeluarprint.component.scss'],
})
export class BarangkeluarprintComponent implements OnInit {

  data
  sendparam

  @ViewChild('print_div') content: ElementRef;

  printCSS = ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'];

  constructor(
    private elRef: ElementRef,
    private func: FunctionService
  ) { }

  ngOnInit() {
    console.log(this.func.TransferDataBrgKlr)
    this.loadData();
  }

  loadData(){
    this.sendparam = this.func.TransferDataBrgKlr
    this.func.postData(this.sendparam.json, this.sendparam.url).toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.data = resp['data'];
        }
      }
    );
  }

  print(){
    
    let doc = new jsPDF();
    let specialElmH = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width':190,
      'elementHandlers': specialElmH
    });
    doc.save('test.pdf');

    // html2canvas(document.querySelector("#print_div")).then(
    //   canvas => {
    //     let doc = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    //     doc.addHTML(this.content.nativeElement, canvas.width, canvas.height)
    //     doc.save("Barang Keluar.pdf");
    //   }
    // );
    
  }

  onClick(){
    this.func.tableToExcel(document.getElementById('mytable'), 'Barang Keluar');
  }

}
