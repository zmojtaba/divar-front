import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule } from '@nebular/theme';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbStatusService } from '@nebular/theme';
import {MatIconModule} from '@angular/material/icon'
import { RouterOutlet,RouterLink } from '@angular/router'

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
    NbIconModule, 
    RouterOutlet,
    RouterLink 
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers:[
    NbStatusService
  ]
})
export class HeaderComponent {
  activeIndex: number ;

  setActive(index: number) {
    this.activeIndex = index;
    console.log(this.activeIndex)
  }
}
