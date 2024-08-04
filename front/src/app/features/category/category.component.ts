import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

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
export class CategoryComponent implements OnInit {
  readonly panelOpenState = signal(false);
  realStateCats = ["Apartment", "House", "Villa", "Studio", "Penthouse", "Residence", "Under Construction Building", "Land", "Commercial Property", "Warehouse"]
  CarCats = ["Cabriolet", "Coupe", "Hatchback 3 Door", "Hatchback 5 Door", "Sedan", "Stationwagon", "SUV"]
  OtherCats = ["Digital Goods", "Kitchen", "Intertainment", "Personal Items"]

  constructor(
    private productService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  onSetCategory(category:string, sub_category:string){
    
    this.productService.searchByCategory(category,sub_category).subscribe(
      data =>{
        if (data){
          if (typeof data === 'string'){}else{

            this.productService._searchByCategory.next(data)
            this.router.navigate(['home'])
          }
        }
      }
    )
  }

}
