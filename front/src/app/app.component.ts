import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { NbThemeModule } from '@nebular/theme';
import { Subscribable, Subscription } from 'rxjs';
import { UserService } from './core/services/user.service';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  verifySatus : string;
  title = 'divar';
  verifySubs: Subscription = new Subscription()
  userIsloggedIn :boolean

  constructor(
    private userService: UserService
  ){}
  ngOnInit(): void {
    this.verifySubs = this.userService.userLoggedIn.subscribe( data=>{
      if (data){
        if ( !this.userService.CheckVerifyUser() ){
          this.verifySatus = 'not_verified'

        }else{
          setTimeout(()=>{
            this.verifySatus = 'verified'
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

  }
}
