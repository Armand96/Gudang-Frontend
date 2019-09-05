import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private func:FunctionService) { }

  ngOnInit() {
    this.loadCountBarangKeluar();
    this.loadCountBarangMasuk();
    this.loadCountJenisBarang();
  }

  jenisbarang;
  barangmasuk;
  barangkeluar;

  loadCountJenisBarang(){
    var LTJB = this.func.getDataWithoutParams('countbarang').subscribe(
      resp => {
        if(resp['success'] = true){
          this.jenisbarang = resp['data'];
        }
        LTJB.unsubscribe();
      }
    );
  }

  loadCountBarangKeluar(){
    var LTJB = this.func.getDataWithoutParams('countbarangkeluar').subscribe(
      resp => {
        if(resp['success'] = true){
          this.barangkeluar = resp['data'];
        }
        LTJB.unsubscribe();
      }
    );
  }

  loadCountBarangMasuk(){
    var LTJB = this.func.getDataWithoutParams('countbarangmasuk').subscribe(
      resp => {
        if(resp['success'] = true){
          this.barangmasuk = resp['data'];
        }
        LTJB.unsubscribe();
      }
    );
  }

}
