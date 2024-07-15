import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [    
    CommonModule,
    NbEvaIconsModule, 
    NbIconModule,
    MatExpansionModule ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [NbStatusService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  readonly panelOpenState = signal(false);
  realStateCats = ["apartment", "House", "Villa", "Studio", "Penthouse", "Residence", "Under Construction Building", "Land", "Commercial Property", "Warehouse"]
  CarCats = ["Cabriolet", "coupe", "Hatchback 5 Door", "Hatchback 5 Door", "Sedan", "stationwagon", "SUV"]
  OtherCats = ["Ashpaxkhane", "Electronic", "Animal"]

  setCategory(cat_name:string){
    console.log(cat_name)
  }

}
