import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { ListbarangComponent } from './listbarang/listbarang.component';
import { HomeComponent } from './home/home.component';
import { DataTablesModule } from 'angular-datatables';
import { TambahbarangComponent } from './listbarang/tambahbarang/tambahbarang.component';
import { DetailbarangComponent } from './listbarang/detailbarang/detailbarang.component';
import { BarangmasukComponent } from './barangmasuk/barangmasuk.component';
import { BarangmasukcreateComponent } from './barangmasuk/barangmasukcreate/barangmasukcreate.component';
import { BarangmasukreadComponent } from './barangmasuk/barangmasukread/barangmasukread.component';
import { BarangmasukeditComponent } from './barangmasuk/barangmasukedit/barangmasukedit.component';

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
      {path:'barangmasukdetail/:id',component:BarangmasukreadComponent},
      {path:'editbarangmasuk/:id',component:BarangmasukeditComponent},
      // {path:'**', redirectTo:'dashboard'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DataTablesModule, ReactiveFormsModule
  ],
  declarations: [DashboardPage, ListbarangComponent, 
    HomeComponent, TambahbarangComponent, DetailbarangComponent,
    BarangmasukcreateComponent, BarangmasukComponent, BarangmasukreadComponent, 
    BarangmasukeditComponent
  ],
  exports:[
    ListbarangComponent, HomeComponent, TambahbarangComponent,
    DetailbarangComponent
  ]
})
export class DashboardPageModule {}
