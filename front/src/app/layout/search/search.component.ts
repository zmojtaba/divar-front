import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbStatusService, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [    
    NbEvaIconsModule, 
    NbIconModule, 
   ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss', 
  providers: [NbStatusService]
})
export class SearchComponent {

}
