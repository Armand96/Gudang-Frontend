import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  public api_token = (localStorage.getItem('api_token') == null) ? "" : localStorage.getItem('api_token');
  public url:string = "http://api.data/api/";
  public dtHeaders = {
    'Authorization':'apl '+this.api_token,
    'Content-Type':'application/json'
  }
  public user = (localStorage.getItem('username') == null) ? "" : localStorage.getItem('username');
  public landscape = new Subject<Boolean>();
  
  func: any;
  
  constructor(
    public plat: Platform,
    private ngZone: NgZone,
    private http: HttpClient, 
    private router:Router,
    private toast:ToastController,
    public loading: LoadingController
  ) {
    window.onresize = (e) =>
    {
        //ngZone.run will help to run change detection
        this.ngZone.run(() => {
            this.landscape.next(this.plat.isLandscape());
        });
    };
   }

  async presentToast(msg:string, txtpos:string, clr?:string, dur?: number) {
    
    dur = (dur) ? dur : 2000;

    const toast = await this.toast.create({
      cssClass:txtpos,
      color: clr,
      position: 'bottom',
      message: msg,
      duration: dur
    });
    toast.present();
  }

  postData(data, path:string){
    return this.http.post(this.url+path, data, {headers:this.dtHeaders});
  }

  getDataWithoutParams(path:string){ 
    return this.http.get(this.url+path, {headers:this.dtHeaders});
  }

  getDataWithParams(params:string, path:string){
    return this.http.get(this.url+path+params, {headers:this.dtHeaders});
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  checkLogin(token){
    
    if (token == ""){
      this.router.navigateByUrl('/login');
    } 

    var data = {
      'api_token':token
    };
    
    var getIn = this.postData(data, 'checklogin').subscribe(
      respond => {      
        if(respond['success']){
          this.api_token = respond['data']['api_token'];
          this.user = respond['data']['username'];
          localStorage.setItem('api_token', this.api_token);
          localStorage.setItem('username', this.user);
        }
        
        getIn.unsubscribe();
      }
    )

  }

  async presentLoadingWithOptions() {
    const loading = await this.loading.create({
      spinner: "crescent",
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'text-center'
    });
    return await loading.present();
  }
  
  // ================== Mengubah angka menjadi kalimat
  terbilang(bilangan:any) {

    bilangan    = String(bilangan);
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
    var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
   
    var panjang_bilangan = bilangan.length;
   
    if (bilangan == "0"){
      var kaLimat = "Nol";
      return kaLimat;
    }

    /* pengujian panjang bilangan */
    if (panjang_bilangan > 15) {
      var kaLimat = "Diluar Batas";
      return kaLimat;
    }
   
    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (var i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-(i),1);
    }
   
    i = 1;
    var j = 0;
    kaLimat = "";
   
   
    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
   
      var subkaLimat = "";
      var kata1 = "";
      var kata2 = "";
      var kata3 = "";
   
      /* untuk Ratusan */
      if (angka[i+2] != "0") {
        if (angka[i+2] == "1") {
          kata1 = "Seratus";
        } else {
          kata1 = kata[angka[i+2]] + " Ratus";
        }
      }
   
      /* untuk Puluhan atau Belasan */
      if (angka[i+1] != "0") {
        if (angka[i+1] == "1") {
          if (angka[i] == "0") {
            kata2 = "Sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "Sebelas";
          } else {
            kata2 = kata[angka[i]] + " Belas";
          }
        } else {
          kata2 = kata[angka[i+1]] + " Puluh";
        }
      }
   
      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i+1] != "1") {
          kata3 = kata[angka[i]];
        }
      }
   
      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
        subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
      }
   
      /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;
   
    }
   
    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if ((angka[5] == "0") && (angka[6] == "0")) {
      kaLimat = kaLimat.replace("Satu Ribu","Seribu");
    }
   
    return kaLimat //+ "Rupiah";
   }

}
