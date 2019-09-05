import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-listbarang',
  templateUrl: './listbarang.component.html',
  styleUrls: ['./listbarang.component.scss'],
})
export class ListbarangComponent implements AfterViewInit, OnInit {

  dtOptions: DataTables.Settings = {};
  landscape:Boolean;
  data;

  constructor(private router:Router, 
    private renderer:Renderer, 
    private func: FunctionService,
    private plat:Platform) { }

  ngOnInit() {
    this.landscape = this.plat.isLandscape();
    (this.landscape) ? this.desktop() : this.mobile();
  }

  mobile(){
    var subs = this.func.getDataWithoutParams('barangshowall').subscribe(
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
        url:this.func.url+"barangshowall",
        type:"GET",
        headers: this.func.dtHeaders
      },
      columnDefs:[
        {"className": "dt-center", "targets": "_all"}
      ],
      columns: [
        {data:"nomor_barang"},
        {data:"nama_barang"},
        {data:"satuan"},
        {data:"kuantitas"},
        {data:"harga_satuan"},
        {
          data:"nomor_barang",
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
        this.router.navigate(["/menu/detailbarang/"+ event.target.getAttribute("detailid")]);
      }
    });
  }

  

}
