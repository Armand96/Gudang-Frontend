import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { IonicSelectableModule } from 'ionic-selectable';

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
      // ========================== Barang Keluar ==========================
      {path:'tambahbarangkeluar',component:BarangkeluarcreateComponent},
      {path:'barangkeluar',component:BarangkeluarComponent},
      {path:'editbarangkeluar/:id',component:BarangkeluareditComponent},
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
    DataTablesModule, ReactiveFormsModule, NgxDatatableModule
  ],
  declarations: [DashboardPage, ListbarangComponent, 
    HomeComponent, TambahbarangComponent, DetailbarangComponent,
    BarangmasukcreateComponent, BarangmasukComponent, 
    BarangmasukeditComponent, BarangkeluarcreateComponent, BarangkeluarComponent,
    BarangkeluareditComponent, AsalbarangComponent
  ],
  exports:[
    ListbarangComponent, HomeComponent, TambahbarangComponent,
    DetailbarangComponent
  ],
  providers:[DatePipe, ListbarangComponent]
})
export class DashboardPageModule {}
