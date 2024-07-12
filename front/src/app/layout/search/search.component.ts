import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbStatusService, NbThemeModule } from '@nebular/theme';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [    
    NbEvaIconsModule, 
    NbIconModule, 
    MatInputModule,
    MatSelectModule
   ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss', 
  providers: [NbStatusService]
})



export class SearchComponent {
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
