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
  realStateCats = ["Apartment", "House", "Villa", "Studio", "Penthouse", "Residence", "Under Construction Building", "Land", "Commercial Property", "Warehouse"]
  CarCats = ["Cabriolet", "Coupe", "Hatchback 5 Door", "Hatchback 5 Door", "Sedan", "Stationwagon", "SUV"]
  OtherCats = ["Digital Goods", "Kitchen", "Intertainment", "Personal Items"]

  onSetCategory(category:string, sub_category:string){
    console.log(category)
  }

  onSetSubCategory(sub_category:string){
    console.log(sub_category)
  }

}
