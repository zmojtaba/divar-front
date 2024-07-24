import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbStatusService, NbThemeModule } from '@nebular/theme';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormControl,FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [    
    CommonModule,
    NbEvaIconsModule, 
    NbIconModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule, 
    MatMenuModule,
    FormsModule,
   ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss', 
  providers: [NbStatusService]
})



export class SearchComponent implements OnInit  {
  searchText: string = '';
  selectedCity: string = 'Lefkosa';
  cities = ['Lefkosa', 'Grine', 'Gazimagusa', 'Guzelyurt', 'Iskele', 'Lefke'];
  @Output() searchEmitter = new EventEmitter<any>();

  constructor(
  ){}

  ngOnInit(): void {
    
  }

  onSearch() {
    const data = {
      "text": this.searchText,
      "city": this.selectedCity
    }
    this.searchEmitter.emit(data)
  }

}
