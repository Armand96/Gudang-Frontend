import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


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
            
  public user = localStorage.getItem('username');
  public key = localStorage.getItem('key');
  
  constructor(
    private http: HttpClient, 
    private router:Router,
    private toast:ToastController
  ) { }

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
        }
        
        getIn.unsubscribe();
      }
    )

  }
  
}
