import { Component ,  OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule, NbListModule } from '@nebular/theme';
import { NbStatusService } from '@nebular/theme';
import {MatListModule} from '@angular/material/list';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileService } from '../../core/services/profile.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from '../../core/services/auth-interceptor.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    NbEvaIconsModule, 
    NbIconModule, 
    MatListModule,
    NbListModule,
    CommonModule,
    RegisterComponent, 
    LoginComponent, 
    ProfileDetailComponent,
    MatButtonModule, 
    MatMenuModule,
    RouterModule,
    HttpClientModule
  ],
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  
  providers: [NbStatusService ,],
})
export class UserComponent implements OnInit {

  userIsLogedIn:boolean;
  formStatus: string = 'register'
  registerSubscription: Subscription = new Subscription()
  userIsVerified: boolean;
  passwordChangeMessage:string;


  constructor( 
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router
    ){
    }

    onSetTitle(title:string){
      this.profileService.getProfileService().subscribe(
        data =>{
          this.profileService.profileData.next(data)
        }
      )
      this.router.navigate(['profile', title]);
    }

  ngOnInit(): void {
    this.registerSubscription = this.userService.userLoggedIn.subscribe( data =>{
      if (data){

        this.userIsLogedIn = true
      }else{
        this.userIsLogedIn = this.userService.userIsLogedIn()
      }
    } )

    this.userIsLogedIn = this.userService.userIsLogedIn()
    if (this.userIsLogedIn){
      this.profileService.getProfileService().subscribe(data=>{
        console.log('__________________________', data)
      })
    }

    this.userService.passwordChanged.subscribe(
      data =>{
        if (data){
          console.log('((((((((((((((((((((((((((((((((((asdjkfhkasdhfkhasdkfh))))))))))', data)
          this.passwordChangeMessage = "Password has changed Succussfully!"
          setTimeout(
            ()=>{
              this.passwordChangeMessage = ''
            }, 2000
          )
        }
      }
    )
  }

  onLogout(){
    const refresh_token = localStorage.getItem('refresh_token')
    this.userService.logOutService(refresh_token).subscribe(
      data =>{
        this.userIsLogedIn = false,
        this.router.navigate(['home'])
      }
    )
  }

  receiveValue(value:any){
    this.formStatus = value
  }

  ngOnChanges(changes: SimpleChanges) {
    this.userIsLogedIn = this.userService.userIsLogedIn()
  }

}
