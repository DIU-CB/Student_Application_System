import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { TokenService } from '../Services/token.service';
import { HttpClient } from '@angular/common/http';
import { PowerOfAttorneyService } from '../Services/powerOfAttorney.service';

interface LoginConfig{
  enableEmployee: boolean;
  passType: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, TokenService, PowerOfAttorneyService]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public enableLoader:boolean = false;
  public errorMsg:string[];
  public workForList;
  public config:LoginConfig = {
    passType: 'password',
    enableEmployee: false
  }

  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private _httpClient: HttpClient,
    private poa: PowerOfAttorneyService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required)
      , password: new FormControl('', Validators.required)
      , granttype: new FormControl('password')
      , workFor: new FormControl()
      , applicationId: new FormControl('4b0bbab5-5c12-4f24-84b5-004c33d79a90')
    })

    let userProfile = this.tokenService.getUserToken();
    
    if (userProfile) {
      this.router.navigate(['./dashboard'])
    }
  }

  // PasswordVisible(e){
  //   e.preventDefault();
  //   if (this.config.passType == 'password') {
  //     this.config.passType = 'text'
  //   } else {
  //     this.config.passType = 'password';
  //   }
  // }

  CheckUser(e){
    let _value = e.target.value;

    if (_value) {
      console.log('check user ', e.target.value)  
    }
    //check value is student id
    let _CheckStudent = _value.split('-')
    if (_CheckStudent.length == 1) {
      this.GetWorkForList(_value)
    }
    
  }

  CheckChange(e){
    this.config.enableEmployee = e.checked;
    
  }
  

  GetWorkForList(_id?:string){
    this.loading = true;
    //this._httpClient.get(this.poa. + id)
    this.poa.GetPowerOfAttorneysForm({ userId : _id })
      .subscribe((res:any)=>{
        if(res.length > 0){
          this.workForList = res;
          this.loading = false;
        } else {
          this.workForList = [];
          this.loginForm.get('workFor').setValue(null);
          this.loading = false;
        }
      }, (err)=>{
        this.errorMsg = err.error.messages;
      })
  }

  Submit(){
    this.enableLoader = true;
    this.authenticationService.Login(this.loginForm.value)
      .subscribe((res)=>{
        //setTimeout(() => {
          this.enableLoader = false;
          this.tokenService.setItem(res)
          this.router.navigate(['./dashboard/home'])
        //}, 3000);
      }, (err)=>{
        this.errorMsg = err.error.messages;
        this.enableLoader = false;
      })
    
  }

}
