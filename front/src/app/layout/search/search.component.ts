import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbStatusService, NbThemeModule } from '@nebular/theme';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [    
    NbEvaIconsModule, 
    NbIconModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule, 
    MatMenuModule,
   ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss', 
  providers: [NbStatusService]
})



export class SearchComponent implements OnInit  {

  ngOnInit(): void {
    
  }

}
