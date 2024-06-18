import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbStatusService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [    
    NbThemeModule,
    NbTabsetModule,
    NbCardModule
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
