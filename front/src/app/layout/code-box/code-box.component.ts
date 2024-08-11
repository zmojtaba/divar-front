import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbCardModule } from '@nebular/theme';
import { CodeInputModule } from 'angular-code-input';
import { Router } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';
import {  BehaviorSubject } from 'rxjs';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-code-box',
  standalone: true,
  imports: [NbCardModule, CodeInputModule, ],
  templateUrl: './code-box.component.html',
  styleUrl: './code-box.component.scss'
})
export class CodeBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CodeBoxComponent>);
  readonly _hash_code = inject<any>(MAT_DIALOG_DATA);
  hash_code:string;
  codeStatus: string
  

  constructor(public utilsService: UtilsService,
    private userService: UserService,
    private router: Router

  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCodeChanged(code: string) {
    
    this.codeStatus = ''
  }
  
  // this called only if user entered full code
  onCodeCompleted(code: string) {

    let hash = this.utilsService.hashCode(code)
    
    if (hash === this.hash_code ){
      this.userService.saveVerifyUser(true)
      this.codeStatus = 'correct'
      setTimeout( ()=>{
        this.userService.userLoggedIn.next(true)
        this.dialogRef.close()
      }, 2000 )

      
    }else{
      this.codeStatus = 'incorrect'
    }
  }

  onResendEmail(){
    this.userService.resendVeryficationEmail().subscribe(
      (data:any) =>{
        console.log('(((((((((((WWWWWWWW)))))))))))))', data)
        this.hash_code = data['hash_code']
      }
    )
  }

  ngOnInit(): void {
    if (this._hash_code){
      this.hash_code = this._hash_code.hash_code
    }
    console.log('::::::::::SSSS::::::::::::::::', this.hash_code)
  }

}
