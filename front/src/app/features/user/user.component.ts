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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [NbStatusService]
})
export class UserComponent implements OnInit {

  userIsLogedIn:boolean;
  formStatus: string = 'register'
  registerSubscription: Subscription = new Subscription()
  userIsVerified: boolean;

  constructor( 
    private userService: UserService,
    private router: Router
    ){
      console.log('=================ng on cons when true===================')
    }

  ngOnInit(): void {
    this.registerSubscription = this.userService.userLoggedIn.subscribe( data =>{
      if (data){
        console.log('=================ng on init when true===================')
        this.userIsLogedIn = true
      }else{
        this.userIsLogedIn = this.userService.userIsLogedIn()
      }
    } )
    
  }

  receiveValue(value:any){
    this.formStatus = value
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('---------------- in user ngonchanges ------------------')
    console.log('---------------- in user ngonchanges ------------------', this.userService.userIsLogedIn())
    this.userIsLogedIn = this.userService.userIsLogedIn()
  }

}
