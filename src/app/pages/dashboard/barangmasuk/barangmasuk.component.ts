import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-barangmasuk',
  templateUrl: './barangmasuk.component.html',
  styleUrls: ['./barangmasuk.component.scss'],
})
export class BarangmasukComponent implements AfterViewInit, OnInit {

  dtOptions: DataTables.Settings = {};
  landscape:Boolean;
  data;
  constructor(
    private router:Router, 
    private renderer:Renderer, 
    private func:FunctionService,
    private plat:Platform
  ) { }

  ngOnInit() {
    this.landscape = this.plat.isLandscape();
    (this.landscape) ? this.desktop() : this.mobile();
  }

  mobile(){
    var subs = this.func.getDataWithoutParams('barangmasukshowall').subscribe(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
        }
        subs.unsubscribe();
      }
    );
  }

  desktop(){
    this.dtOptions = {
      ajax: {
        url:this.func.url+"barangmasukshowall",
        type:"GET",
        headers: this.func.dtHeaders
      },
      columnDefs:[
        {"className": "dt-center", "targets": "_all"}
      ],
      columns: [
        {data:"nomor_barang"},
        {data:"tgl_masuk"},
        {data:"no_kontrak"},
        {data:"asal_barang"},
        {data:"jml_msk_angka"},
        {
          data:"id",
          render: function (data: any, type: any, full: any) {
            return '<td> <ion-button detailid="'+data+'"> Detail </ion-button> </td>';
          }
        },
      ]
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("detailid")) {
        this.router.navigate(["/menu/barangmasukdetail/"+ event.target.getAttribute("detailid")]);
      }
    });
  }

}
