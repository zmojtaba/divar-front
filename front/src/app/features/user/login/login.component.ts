import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { UserComponent } from '../user.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UtilsService } from '../../../core/services/utils.service';



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
    RouterModule,
    UserComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loadingSpinner: boolean = false;
  loginError : string = ''
  loginForm : FormGroup;
  language:string;
  @Output() formChanger = new EventEmitter<string>();
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService:UtilsService
  ){}

  ngOnInit() {
    this.language = this.utilService.checkLan()
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
    this.userService.logInService(email, password)
    .subscribe({
      next:
      (data:any) => {
        this.loadingSpinner = false;
        
        this.router.navigate(['user']).then(() => {
          window.location.reload();
        });;
      }, 
      error: (errorMessage) => {
        const response = JSON.parse(JSON.stringify(errorMessage)) 
        this.loadingSpinner = false
        this.loginError = response.error.detail[0]
    }
    }
      )
    
  }

  onRegisterForm(){
    this.formChanger.emit('register')
  }


  onForgetPass(){
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      height: '600px',
      width: '600px',
      // data: {hash_code: hash_code,},
      panelClass: 'forget_pass-dialog'
  });
  }


}
