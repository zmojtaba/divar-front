import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet,RouterLink, ActivatedRoute } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { NbStatusService } from '@nebular/theme';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';
import { ProductService } from '../../../core/services/product.service';
import {MatCardModule} from '@angular/material/card';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    NbEvaIconsModule, 
    NbIconModule, 
    MatListModule,
    NbListModule,
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
    RouterModule,
    MatCardModule,
    NbCardModule,
    TimeAgoPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NbStatusService],
})
export class ProductDetailComponent implements OnInit {

  title:string;
  category:string;
  id :string;
  adsDetailData :any;
  imageId = 0;
  disabledNextIcon:boolean;
  disabledPreviousIcon:boolean
  createdDate = "2024-07-20T10:49:30.041372Z";
  date = new Date(this.createdDate);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService

  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title']
      this.category = params['category']
      this.id = params['id']
    });

    this.productService.adsDetailData.subscribe(
      data=>{
        this.adsDetailData = data
      }
    )

    if (!this.adsDetailData){
      this.productService.getAdsDetailData(this.category, this.id).subscribe(
        data =>{
          this.adsDetailData = data
          this.adsDetailData.images  = typeof this.adsDetailData.images === 'string' ? JSON.parse(this.adsDetailData.images) :  this.adsDetailData.images;
        }
      )
    }
    
  }

  onSetImage(action:string){

    if (action=='next'){
      this.imageId = this.imageId + 1
    }
    if (action == 'previous'){
      this.imageId = this.imageId - 1
    }
  }









}
