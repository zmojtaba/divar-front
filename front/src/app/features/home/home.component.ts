import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../layout/search/search.component';
import { NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

}
