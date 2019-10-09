import { OthersComponent } from './../modal/others/others.component';
import { NokontrakComponent } from './barangmasuk/barangmasukread/nokontrak/nokontrak.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { DataTablesModule } from 'angular-datatables';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxPrintModule } from 'ngx-print';
import { ExportAsModule } from 'ngx-export-as';

// =================================================== PAGES ===================================================
import { DashboardPage } from './dashboard.page';
import { HomeComponent } from './home/home.component';
import { TambahbarangComponent } from './listbarang/tambahbarang/tambahbarang.component';
import { DetailbarangComponent } from './listbarang/detailbarang/detailbarang.component';
import { BarangmasukComponent } from './barangmasuk/barangmasuk.component';
import { BarangmasukcreateComponent } from './barangmasuk/barangmasukcreate/barangmasukcreate.component';
import { BarangmasukeditComponent } from './barangmasuk/barangmasukedit/barangmasukedit.component';
import { ListbarangComponent } from './listbarang/listbarang.component';
import { BarangkeluarcreateComponent } from './barangkeluar/barangkeluarcreate/barangkeluarcreate.component';
import { BarangkeluarComponent } from './barangkeluar/barangkeluar.component';
import { BarangkeluareditComponent } from './barangkeluar/barangkeluaredit/barangkeluaredit.component';
import { AsalbarangComponent } from './barangmasuk/barangmasukread/asalbarang/asalbarang.component';
import { NomorbarangmasukComponent } from './barangmasuk/barangmasukread/nomorbarangmasuk/nomorbarangmasuk.component';
import { NomorbarangkeluarComponent } from './barangkeluar/barangkeluarread/nomorbarangkeluar/nomorbarangkeluar.component';
import { ProyekComponent } from './barangkeluar/barangkeluarread/proyek/proyek.component';
import { BengkelComponent } from './barangkeluar/barangkeluarread/bengkel/bengkel.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { AuditlistComponent } from './audits/auditlist/auditlist.component';
import { AuditdetailComponent } from './audits/auditdetail/auditdetail.component';
import { BarangmasukprintComponent } from './printable/barangmasukprint/barangmasukprint.component';
import { BarangkeluarprintComponent } from './printable/barangkeluarprint/barangkeluarprint.component';
import { BrgkeluarinfoComponent } from '../modal/brgkeluarinfo/brgkeluarinfo.component';
import { BrgmasukinfoComponent } from '../modal/brgmasukinfo/brgmasukinfo.component';
import { ListBarangModalComponent } from '../modal/list-barang-modal/list-barang-modal.component';
import { NospmComponent } from './barangkeluar/barangkeluarread/nospm/nospm.component';
import { NobapmComponent } from './barangmasuk/barangmasukread/nobapm/nobapm.component';
import { NoorderlistComponent } from './other/noorder/noorderlist/noorderlist.component';
import { NoordercreateComponent } from './other/noorder/noordercreate/noordercreate.component';
import { KodepekerjaanlistComponent } from './other/kodepekerjaan/kodepekerjaanlist/kodepekerjaanlist.component';
import { KodepekerjaancreateComponent } from './other/kodepekerjaan/kodepekerjaancreate/kodepekerjaancreate.component';
import { NoordereditComponent } from './other/noorder/noorderedit/noorderedit.component';
import { KodepekerjaaneditComponent } from './kodepekerjaan/kodepekerjaanedit/kodepekerjaanedit.component';
// =================================================== PAGES ===================================================

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      {path:'dashboard',component:HomeComponent},
      // ========================== List barang ==========================
      {path:'barang',component:ListbarangComponent},
      {path:'tambahbarang',component:TambahbarangComponent},
      {path:'detailbarang/:id',component:DetailbarangComponent},
      // ========================== Barang Masuk ==========================
      {path:'tambahbarangmasuk',component:BarangmasukcreateComponent},
      {path:'barangmasuk',component:BarangmasukComponent},
      {path:'editbarangmasuk/:id',component:BarangmasukeditComponent},
      {path:'asalbarang',component:AsalbarangComponent},
      {path:'nokontrak',component:NokontrakComponent},
      {path:'nomorbarangmasuk',component:NomorbarangmasukComponent},
      {path:'nobapm',component:NobapmComponent},
      // ========================== Barang Keluar ==========================
      {path:'tambahbarangkeluar',component:BarangkeluarcreateComponent},
      {path:'barangkeluar',component:BarangkeluarComponent},
      {path:'editbarangkeluar/:id',component:BarangkeluareditComponent},
      {path:'nomorbarangkeluar',component:NomorbarangkeluarComponent},
      {path:'proyek',component:ProyekComponent},
      {path:'bengkel',component:BengkelComponent},
      {path:'nospm',component:NospmComponent},
      // ========================== USER ==========================
      {path:'adduser',component:AdduserComponent},
      // ========================== AUDITS ==========================
      {path:'audits',component:AuditlistComponent},
      {path:'auditdetail/:id',component:AuditdetailComponent},
      // ========================== Other ==========================
      {path:'noorder', component:NoorderlistComponent},
      {path:'noordercreate', component:NoordercreateComponent},
      {path:'noorderedit/:id', component:NoordereditComponent},

      {path:'kodepekerjaan', component:KodepekerjaanlistComponent},
      {path:'kodepekerjaancreate', component:KodepekerjaancreateComponent},
      {path:'kodepekerjaanedit/:id', component:KodepekerjaaneditComponent},
      // ========================== Printable ==========================
      {path:'barangmasukexc',component:BarangmasukprintComponent},
      {path:'barangkeluarexc',component:BarangkeluarprintComponent},
      // ========================== Wild Card ==========================
      
      {path:'**', redirectTo:'dashboard'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, NgxPaginationModule,
    RouterModule.forChild(routes), IonicSelectableModule,
    ReactiveFormsModule, NgxDatatableModule,
    NgxPrintModule, ExportAsModule
  ],
  declarations: [DashboardPage, ListbarangComponent, 
    HomeComponent, TambahbarangComponent, DetailbarangComponent,
    BarangmasukcreateComponent, BarangmasukComponent, 
    BarangmasukeditComponent, BarangkeluarcreateComponent, BarangkeluarComponent,
    BarangkeluareditComponent, AsalbarangComponent, NomorbarangmasukComponent, 
    NomorbarangkeluarComponent, ProyekComponent, BengkelComponent, AdduserComponent,
    AuditlistComponent, AuditdetailComponent, BarangmasukprintComponent,
    BarangkeluarprintComponent, BrgkeluarinfoComponent, BrgmasukinfoComponent,
    ListBarangModalComponent, NokontrakComponent, NospmComponent, NobapmComponent,
    NoorderlistComponent, NoordercreateComponent, KodepekerjaanlistComponent, 
    NoordereditComponent, KodepekerjaancreateComponent, KodepekerjaaneditComponent,
    OthersComponent
  ],
  exports:[
    ListbarangComponent, HomeComponent, TambahbarangComponent,
    DetailbarangComponent
  ],
  providers:[DatePipe, ListbarangComponent],
  entryComponents:[BrgkeluarinfoComponent, BrgmasukinfoComponent, ListBarangModalComponent, OthersComponent]
})
export class DashboardPageModule {}
