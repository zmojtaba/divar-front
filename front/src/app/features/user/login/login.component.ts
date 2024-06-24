import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    MatPasswordStrengthModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loadingSpinner: boolean = false;
  loginError : string = ''
  loginForm : FormGroup;
  @Output() formChanger = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-z]{2,7}$")
      ]],
      password: ['', [Validators.required]],
    })
  }

  onLogin(form:any){
    const email = form.value.email
    const password = form.value.password
    this.loadingSpinner = true
    // this.authService.logInService(email, password)
    // .subscribe(data => {
    //   console.log(data)
    //   this.loadingSpinner = false;
    //   this.router.navigate([''])
    // }, err => {
    //   this.loginError = err
    //   this.loadingSpinner = false
    
    // })
    
  }

  onRegisterForm(){
    this.formChanger.emit('register')
  }


}
