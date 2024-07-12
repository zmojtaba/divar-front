import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../layout/search/search.component';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent,
    NbEvaIconsModule, 
    NbIconModule, 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NbStatusService]
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

}
