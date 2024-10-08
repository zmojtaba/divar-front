import { Component, NgModule, OnInit, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { NbThemeModule } from '@nebular/theme';
import { Subscribable, Subscription } from 'rxjs';
import { UserService } from './core/services/user.service';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './features/user/profile-detail/profile-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from './core/services/token.service';
import { CodeBoxComponent } from './layout/code-box/code-box.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NbThemeModule,
    RouterOutlet, 
    HomeComponent, 
    HeaderComponent,
    RouterModule,
    ProfileDetailComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
  ]
})
export class AppComponent implements OnInit {
  verifySatus : string;
  title = 'divar';
  verifySubs: Subscription = new Subscription()
  userIsloggedIn :boolean
  readonly dialog = inject(MatDialog);

  showLogo : boolean = true;

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ){}
  ngOnInit(): void {
    
    this.verifySubs = this.userService.userLoggedIn.subscribe( data=>{
      if (data){
        if ( !this.userService.CheckVerifyUser() ){
          this.verifySatus = 'not_verified'

        }else{
          this.verifySatus = 'verified'
          setTimeout(()=>{
            this.verifySatus = ''
          }, 3000)
        }
      }
    } )

    this.userIsloggedIn = this.userService.userIsLogedIn()
    if ( this.userIsloggedIn ){


      if (!this.userService.CheckVerifyUser()){
        this.verifySatus = 'not_verified'

      }
    }

    setTimeout( ()=>{
      this.showLogo = false;
    }, 3000 )

  }

  onVerifyEmail(){
    const accessToken = localStorage.getItem('access_token')
    const hash_code = this.tokenService.decodeJwt(accessToken).hash_code
    const dialogRef = this.dialog.open(CodeBoxComponent, {
      height: '400px',
      width: '600px',
      data: {hash_code: hash_code,},
      panelClass: 'code_box-dialog'
  });
  }

}
