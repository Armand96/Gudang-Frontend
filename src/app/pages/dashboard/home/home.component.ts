import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private func:FunctionService) { }

  async ngOnInit() {
    this.isLoading = true;
    
    await this.loadCountBarangKeluar();
    await this.loadCountBarangMasuk();
    await this.loadCountJenisBarang();
    // await this.func.delay(1000);
    
    this.isLoading = false;
  }

  jenisbarang;
  barangmasuk;
  barangkeluar;
  isLoading:Boolean;

  async loadCountJenisBarang(){
    await this.func.getDataWithoutParams('countbarang').toPromise().then(
      resp => {
        if(resp['success'] = true){
          this.jenisbarang = resp['data'];
        }
      },
      err => {}
    );
  }

  async loadCountBarangKeluar(){
    await this.func.getDataWithoutParams('countbarangkeluar').toPromise().then(
      resp => {
        if(resp['success'] = true){
          this.barangkeluar = resp['data'];
        }
      },
      err=>{}
    );
  }

  async loadCountBarangMasuk(){
    await this.func.getDataWithoutParams('countbarangmasuk').toPromise().then(
      resp => {
        if(resp['success'] = true){
          this.barangmasuk = resp['data'];
        }
      },
      err => {}
    );
  }

}
