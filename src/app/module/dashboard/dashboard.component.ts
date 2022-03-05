import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DashboardService } from './shared/services/dashboard.service';
import { TokenService } from 'src/app/core/authentication/Services/token.service';
import { AuthorizationService } from 'src/app/core/authentication/Services/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService, AuthorizationService]
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;
  setting:any;
  leftmode;// = new FormControl(this.setting.sidenav.left.slideStyle);
  rightmode;// = new FormControl(this.setting.sidenav.right.slideStyle);

  userProfile;

  opened:boolean = true;

  constructor(
    changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher
    , private overlay: OverlayContainer
    , private dashService: DashboardService
    // , public log: LoginService
    , private tokenService: TokenService
    , private route: Router
    , public auth: AuthorizationService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      console.log(this.mobileQuery)
      if (this.mobileQuery.matches) {
        this.opened = false;
      } else {
        this.opened = true;
      }
      changeDetectorRef.detectChanges()}
      ;
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.setting = this.dashService.GetDefault();
    this.userProfile = this.tokenService.getUserToken();
    if (this.userProfile == null) {
      this.route.navigate(['./login'])
    }

    if (this.auth.isTokenExpired()) {
      this.LogOut();
    }

    let existingTheme = localStorage.getItem('theme');
    if (existingTheme) {
      this.ChangeTheme(existingTheme);
    } else {
      this.ChangeTheme('teal-theme');
    }
    
  }

  ChangeTheme(_themeName:string):void{
    
    let bodyClass = document.body.classList;
    if (bodyClass.length > 0) {
      for (let i = 0; i < bodyClass.length; i++) {
        const elem = bodyClass[i];
        bodyClass.remove(elem);
      }
    }
    bodyClass.remove();
    bodyClass.add(_themeName);
    localStorage.setItem('theme', _themeName)
  }

  LogOut(){
    this.tokenService.removeItem()
    this.ngOnInit()
  }
  
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
