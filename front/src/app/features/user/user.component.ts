import { Component ,  OnInit} from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule, NbListModule } from '@nebular/theme';
import { NbStatusService } from '@nebular/theme';
import {MatListModule} from '@angular/material/list';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


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
  formStatus: string = 'login'


  ngOnInit(): void {

  }

  constructor( 
    private userService: UserService,
    private router: Router
    ){
    this.userIsLogedIn = userService.userIsLogedIn()
    console.log('------------+++----------------',this.userIsLogedIn)
  }
  receiveValue(value:any){
    this.formStatus = value
    console.log('------------------', value)
  }
}
