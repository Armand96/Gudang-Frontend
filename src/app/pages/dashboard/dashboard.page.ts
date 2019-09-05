import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'home'
    },
    {
      title: 'Barang',
      children: [
        {
          title: 'Daftar Barang',
          url: '/menu/barang',
          icon: 'pricetags'
        },
      ]
    },
    {
      title: 'Barang Masuk',
      children: [
        {
          title: 'List Barang Masuk',
          url: '/menu/barangmasuk',
          icon: 'logo-ionic'
        },
      ]
    },
    {
      title: 'Barang Keluar',
      children: [
        {
          title: 'Daftar Barang Keluar',
          url: '/menu/barangkeluar',
          icon: 'logo-ionic'
        },
      ]
    }
  ];

  constructor(
    private menu: MenuController,
    private func: FunctionService,
    private router: Router
    ) { }

  async ngOnInit () {
    if(this.func.api_token == "" || this.func.api_token == null){
      this.router.navigateByUrl('/login');
    } else {
      await this.func.checkLogin(this.func.api_token);
      this.router.navigateByUrl('/menu/dashboard');
    }
    
  }

  logout(){
    localStorage.clear();
    this.func.user = "";
    this.func.key = "";
    this.router.navigateByUrl('/login');
  }

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }
}
