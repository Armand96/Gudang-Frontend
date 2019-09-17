import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FunctionService } from 'src/app/core/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.func.landscape.unsubscribe();
  }

  textpos:Boolean = this.func.plat.isLandscape();
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
        {
          title: 'Asal Barang',
          url: '/menu/asalbarang',
          icon: 'logo-ionic'
        },
        {
          title: 'Nomor Barang Masuk',
          url: '/menu/nomorbarangmasuk',
          icon: 'logo-ionic'
        },
      ]
    },
    {
      title: 'Barang Keluar',
      children: [
        {
          title: 'List Barang Keluar',
          url: '/menu/barangkeluar',
          icon: 'logo-ionic'
        },
        {
          title: 'Nomor Barang Keluar',
          url: '/menu/nomorbarangkeluar',
          icon: 'logo-ionic'
        },
        {
          title: 'Proyek',
          url: '/menu/proyek',
          icon: 'logo-ionic'
        },
        {
          title: 'Bengkel',
          url: '/menu/bengkel',
          icon: 'logo-ionic'
        },
      ]
    }
  ];

  user = this.func.user;

  constructor(
    private menu: MenuController,
    private func: FunctionService,
    private router: Router
    ) {}

  async ngOnInit () {
    if(this.func.api_token == "" || this.func.api_token == null){
      this.router.navigateByUrl('/login');
    } else {
      await this.func.checkLogin(this.func.api_token);
      this.user = this.func.user;
      // this.router.navigateByUrl('/menu/dashboard');
      this.func.landscape.subscribe(
        resp=>{
          this.textpos = resp ? true : false;
        }
      )
    }
    
  }

  logout(){
    localStorage.clear();
    this.func.user = "";
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
