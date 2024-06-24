import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, EventEmitter, Output, output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SignUpModel } from '../../../models/user.model';



@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  signupError: string = '';
  signupSuccess: string = '';
  signUpForm: FormGroup;
  snippingLoading: boolean = false;
  showPasswordStatus: boolean = false;
  showDetails: boolean=true;
  @Output() formChanger = new EventEmitter<string>();

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-z]{2,7}$")
      ]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}') ]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
    });
  }
  
  onStrengthChanged(strength: number) {
  }

  OnPasswordToggle(){
    this.showPasswordStatus = !this.showPasswordStatus;
   }

   onSignUp(form:any){
    this.snippingLoading = true;
    const email = form.value.email
    const password = form.value.password
    const password1 = form.value.password1
    
    this.userService.signUpService(email, password, password1)
    .subscribe({
      next:
       (data : SignUpModel) => {
        this.snippingLoading = false
        this.signupSuccess = data['message']
        this.router.navigate(['/'])
    }, 
      error: (errorMessage) => {
        this.snippingLoading = false
        this.signupError = errorMessage
    }
  }); 
    form.reset()   
    
  }
  onLoginForm(){
    this.formChanger.emit('login')
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService

  ){

  }

}
