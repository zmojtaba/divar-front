import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbStatusService, NbStepperComponent, NbStepperModule, NbThemeModule } from '@nebular/theme';
import { UserService } from '../../../core/services/user.service';
import { CodeInputModule } from 'angular-code-input';
import { UtilsService } from '../../../core/services/utils.service';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NbStepperModule,
    CommonModule, 
    NbThemeModule,
    NbCardModule, 
    MatIconModule, 
    NbEvaIconsModule, 
    NbIconModule, 
    FormsModule,
    MatProgressSpinnerModule,
    CodeInputModule,
    MatPasswordStrengthModule,
    MatSlideToggleModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [NbStatusService],
})
export class ForgetPasswordComponent implements OnInit {
  linearMode = false;
  username:string;
  @ViewChild('stepper') stepper!: NbStepperComponent;
  snippingLoading = false;
  errorMessage:string;
  hashCode:string
  codeStatus: string;
  verificationCode:string;
  showPasswordStatus: boolean = false;
  showDetails: boolean=true;
  newPassword:string;
  submitError:any;
  readonly dialogRef = inject(MatDialogRef<ForgetPasswordComponent>);

  constructor(
    private userService: UserService,
    private utilsService:UtilsService,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log(this.username)
  }

  onUserName(){
    console.log(this.username)
    if(this.username){
      // this.snippingLoading = true
      this.userService.forgetPassWordEmail(this.username).subscribe(
        (data:any) =>{
          this.hashCode = data.detail['hash_code']
          this.errorMessage = ''
          // this.snippingLoading=false
          this.stepper.next()
        }, (err:any) =>{
          this.errorMessage = err.error.detail['message']
          // this.snippingLoading=false
        }
      )
    }

  }


  onCodeChanged(code: string) {
    this.codeStatus = ''
  }
  
  // this called only if user entered full code
  onCodeCompleted(code: string) {
    let hash = this.utilsService.hashCode(code)
    if (hash === this.hashCode ){
      this.codeStatus = 'correct'
      this.verificationCode = code
      setTimeout( ()=>{
        this.stepper.next()
      }
        , 1000
      )
      
    }else{
      this.codeStatus = 'incorrect'
    }
  }

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  onStrengthChanged(strength: number) {
  }

  OnPasswordToggle(){
    this.showPasswordStatus = !this.showPasswordStatus;
   }


   onSubmitForgetPass(){
    if (this.username && this.verificationCode && this.newPassword){
      this.userService.forgetPasswordChange(this.username, this.verificationCode, this.newPassword).subscribe(
        (data:any) =>{
          this.router.navigate(['user'])
          this.userService.passwordChanged.next(true)
          this.dialogRef.close()
        }, err =>{
          console.log('---------------------reset pass---!!!!-----------', err.error.detail)
          this.submitError = err.error.detail
        }
      )
    }
   }
}
