import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';

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
  language:string;
  turkishRealStateCats = [
    "Daire",          // Apartment
    "Ev",             // House
    "Villa",          // Villa
    "Stüdyo",         // Studio
    "Çatı Katı",      // Penthouse
    "Rezidans",       // Residence
    "İnşaat Halinde Bina",  // Under Construction Building
    "Arsa",           // Land
    "Ticari Mülk",    // Commercial Property
    "Depo"            // Warehouse
  ];
  
  turkishCarCats = [
    "Kabrio",           // Cabriolet
    "Coupe",            // Coupe
    "3 Kapılı Hatchback", // Hatchback 3 Door
    "5 Kapılı Hatchback", // Hatchback 5 Door
    "Sedan",            // Sedan
    "Stationwagon",     // Stationwagon
    "SUV"               // SUV
  ];
  
  turkishOtherCats = [
    "Dijital Ürünler",    // Digital Goods
    "Mutfak",             // Kitchen
    "Eğlence",            // Entertainment
    "Kişisel Eşyalar"     // Personal Items
  ];
  

  constructor(
    private productService: ProductService,
    private router: Router,
    private utilService:UtilsService
  ){}

  ngOnInit(): void {
    this.language = this.utilService.checkLan()
    
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
