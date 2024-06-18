import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule } from '@nebular/theme';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbStatusService } from '@nebular/theme';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [    
    NbThemeModule,
    NbTabsetModule,
    NbCardModule, 
    MatIconModule, 
    NbEvaIconsModule, 
    NbIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers:[
    NbStatusService
  ]
})
export class HeaderComponent {
  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;
    console.log(this.activeIndex)
  }
}
