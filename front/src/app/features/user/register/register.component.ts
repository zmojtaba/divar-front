import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, EventEmitter, Output, output, Optional, InjectionToken, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SignUpModel } from '../../../models/user.model';
import { CodeBoxComponent } from '../../../layout/code-box/code-box.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TokenService } from '../../../core/services/token.service';


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
  providers:[ 
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  signupError: string;
  signUpForm: FormGroup;
  snippingLoading: boolean = false;
  showPasswordStatus: boolean = false;
  showDetails: boolean=true;
  @Output() formChanger = new EventEmitter<string>();
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService,
    public tokenService: TokenService
  ){

  }



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
    this.snippingLoading = false;
    const email = form.value.email
    const password = form.value.password
    const password1 = form.value.password1
    
    this.userService.signUpService(email, password, password1)
    .subscribe({
      next:
       (data : any) => {
        this.snippingLoading = false
        this.userService.userLoggedIn.next(true)
        const response = JSON.parse(JSON.stringify(data)) 
        const hash_code = this.tokenService.decodeJwt(response.detail['access_token']).hash_code
        console.log('================================hash doce=====', hash_code)
        const dialogRef = this.dialog.open(CodeBoxComponent, {
          height: '400px',
          width: '600px',
          data: {hash_code: hash_code,},
          panelClass: 'code_box-dialog'
      });
        
    }, 
      error: (errorMessage) => {
        this.snippingLoading = false
        console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', JSON.parse(JSON.stringify(errorMessage)).error.username[0] )
        console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        this.signupError = JSON.parse(JSON.stringify(errorMessage)).error.username[0]
    }
  }); 
    // form.reset()   
    
  }
  onLoginForm(){
    this.formChanger.emit('login')
  }





}
