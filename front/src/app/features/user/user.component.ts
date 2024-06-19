import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule } from '@nebular/theme';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbStatusService } from '@nebular/theme';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    NbEvaIconsModule, 
    NbIconModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [NbStatusService]
})
export class UserComponent {

}
