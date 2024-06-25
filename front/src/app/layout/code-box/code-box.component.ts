import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbCardModule } from '@nebular/theme';
import { CodeInputModule } from 'angular-code-input';

import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-code-box',
  standalone: true,
  imports: [NbCardModule, CodeInputModule],
  templateUrl: './code-box.component.html',
  styleUrl: './code-box.component.scss'
})
export class CodeBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CodeBoxComponent>);
  readonly hash_code = inject<any>(MAT_DIALOG_DATA);
  isCorrect: boolean = false

  constructor(public utilsService: UtilsService){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCodeChanged(code: string) {
  }
  
  // this called only if user entered full code
  onCodeCompleted(code: string) {
    let hash = this.utilsService.hashCode(code)
    console.log(this.hash_code.hash_code)
    if (hash === this.hash_code.hash_code ){
      this.isCorrect = true
      console.log(this.isCorrect)
    }
  }

  ngOnInit(): void {

  }

}
