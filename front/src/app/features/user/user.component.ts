import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule, NbListModule } from '@nebular/theme';
import { NbThemeModule, NbTabsetModule, NbCardModule, NbStatusService } from '@nebular/theme';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    NbEvaIconsModule, 
    NbIconModule, 
    MatListModule,
    NbListModule 
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [NbStatusService]
})
export class UserComponent {

}
