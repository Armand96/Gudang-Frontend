import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionService } from 'src/app/core/function.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private func: FunctionService
  ) { 
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      userpass: ['', Validators.required],
    });
  }

  errs = null
  data:any = {};

  //test object
  logincred = {
    'username':'Iskandar',
    'userpassword':'iskandar'
  }

  ngOnInit() {
   
  }

  async Login(val){    
    this.data.username = val.username;
    this.data.userpassword = val.userpass;

    this.func.presentLoadingWithOptions();
    await this.func.postData(this.data, 'login').toPromise().then(
      async resp => {
        if (resp['success']){
          
          this.func.api_token = resp['data']['api_token'];
          this.func.user = resp['data']['username'];

          this.func.dtHeaders.Authorization = 'apl '+this.func.api_token;
          
          await localStorage.setItem('api_token', this.func.api_token);
          await localStorage.setItem('username', this.func.user);
          this.router.navigateByUrl('/menu');
        } else {
          this.func.presentToast(resp['message'], 'text-center', 'danger');
        }
      },
      err=>{
        if (!err.ok){
          this.func.presentToast('Tidak dapat terhubung ke server', 'text-center', 'danger', 5000);
        }
      }
    );
    
  }

  

}
