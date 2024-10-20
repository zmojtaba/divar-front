import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    NbEvaIconsModule, 
    NbIconModule,
    MatExpansionModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers:[NbStatusService]
})
export class ProductComponent implements OnInit{
  readonly panelOpenState = signal(false);
  realStateCats = ["Apartment", "House", "Villa", "Studio", "Penthouse", "Residence", "Under Construction Building", "Land", "Commercial Property", "Warehouse"]
  CarCats = ["Cabriolet", "Coupe", "Hatchback 3 Door", "Hatchback 5 Door", "Sedan", "Stationwagon", "SUV"]
  OtherCats = ["Digital Goods", "Kitchen", "Intertainment", "Personal Items"]
  language:string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private utilService:UtilsService
  ){}

  ngOnInit(): void {
    this.language = this.utilService.checkLan()
    if (!this.userService.userIsLogedIn()){
      this.router.navigate(['user'])
    }
  }

  onSetCategory(category:string, sub_category:string){
    console.log('-------------------', category, sub_category)
    this.router.navigate(['ads/product/create-ads', category, sub_category])
  }
}
