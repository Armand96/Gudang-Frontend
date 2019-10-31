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

  textpos: Boolean = this.func.plat.isLandscape();
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
          icon: 'list'
        },
      ]
    },
    {
      title: 'Barang Masuk',
      children: [
        {
          title: 'List Barang Masuk',
          url: '/menu/barangmasuk',
          icon: 'list'
        },
        {
          title: 'Nomor Barang Masuk',
          url: '/menu/nomorbarangmasuk',
          icon: 'pricetag'
        },
        {
          title: 'No BAPM',
          url: '/menu/nobapm',
          icon: 'briefcase'
        },
        // {
        //   title: 'Asal Barang',
        //   url: '/menu/asalbarang',
        //   icon: 'briefcase'
        // },
        // {
        //   title: 'No Kontrak',
        //   url: '/menu/nokontrak',
        //   icon: 'briefcase'
        // },
      ]
    },
    {
      title: 'Barang Keluar',
      children: [
        {
          title: 'List Barang Keluar',
          url: '/menu/barangkeluar',
          icon: 'list'
        },
        {
          title: 'Nomor Barang Keluar',
          url: '/menu/nomorbarangkeluar',
          icon: 'pricetag'
        },
        {
          title: 'No SPM',
          url: '/menu/nospm',
          icon: 'briefcase'
        },
        {
          title: 'Proyek',
          url: '/menu/proyek',
          icon: 'briefcase'
        },
        // {
        //   title: 'Bengkel',
        //   url: '/menu/bengkel',
        //   icon: 'briefcase'
        // },
      ]
    },
    {
      title: 'SPP (Surat Permintaan Pembelian)',
      children: [
        {
          title: 'List SPP',
          url: '/menu/ssp',
          icon: 'filing'
        },
        {
          title: 'Cetak SPP',
          url: '/menu/sspread',
          icon: 'briefcase'
        },
      ]
    },
    // {
    //   title: 'Nomor Order',
    //   url: '/menu/noorder',
    //   icon: 'filing'
    // },
    {
      title: 'Kode Pekerjaan',
      url: '/menu/kodepekerjaan',
      icon: 'filing'
    },
    {
      title: 'Bengkel',
      url: '/menu/bengkel',
      icon: 'filing'
    },
    {
      title: 'Audits',
      url: '/menu/audits',
      icon: 'clipboard'
    },
    {
      title: 'Pengguna',
      children: [
        {
          title: 'Tambah Pengguna',
          url: '/menu/adduser',
          icon: 'logo-ionic'
        }
      ]
    },
  ];

  user = this.func.user;

  constructor(
    private menu: MenuController,
    private func: FunctionService,
    private router: Router
  ) { }

  async ngOnInit() {
    if (this.func.api_token == "" || this.func.api_token == null) {
      this.router.navigateByUrl('/login');
    } else {
      await this.func.checkLogin(this.func.api_token);
      this.user = this.func.user;
      // this.router.navigateByUrl('/menu/dashboard');
      this.func.landscape.subscribe(
        resp => {
          this.textpos = resp ? true : false;
        }
      )
    }

    if (this.user != 'Admin') {
      this.pages.pop();
    }

  }

  async logout() {
    await localStorage.clear();
    this.func.user = "";
    this.func.api_token = "";
    // this.router.navigateByUrl('/login');
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
