import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../layout/search/search.component';
import { NbIconModule, NbListModule, NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { text } from 'stream/consumers';
import { NotFoundComponent } from '../../layout/not-found/not-found.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
// import { NewsService } from './news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    NbEvaIconsModule, 
    NbIconModule, 
    NbListModule,
    CommonModule,
    NotFoundComponent,
    NbEvaIconsModule, 
    NbIconModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule, 
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NbStatusService]
})
export class HomeComponent implements OnInit {
  adsData:any;
  filterList = ["Newest", "Oldest", "Cheapest", "Most Expensive", "Most Visited"];
  selectedFilter: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    ) {}

  ngOnInit(): void {


    this.productService._searchByCategory.subscribe(
      (data:any)=>{
        // it for when data from search by category
        if (data){
          this.adsData = data
          this.processAdsData(this.adsData)
        }
        else{
          this.productService.getHomeAdsData().subscribe(
            (data:any) =>{
              
              this.adsData = data['All_ads']
              this.processAdsData(this.adsData)
            }
          )
        }
      }
    )


  }

  selectFilter(filter:string) {
    console.log("selectFilter: ", filter);
    this.selectedFilter = filter;
    this.productService.filterAds(this.selectedFilter).subscribe( 
      (data:any) =>{
        
        console.log("adsData: ", data);
        data = typeof data === 'string' ? JSON.parse(data) : data
        this.adsData = data['All_ads']
        this.processAdsData(this.adsData)

      }
  )
  }

  processAdsData(ads_data:any[]){
    if(ads_data.length > 0){
      for (let ads of ads_data){
        ads.images = typeof ads.images === 'string' ? JSON.parse(ads.images) : ads.images;
      }
    }
  }

  onDetailView(data:any){
    this.productService.adsDetailData.next(data)
    this.router.navigate(['/ads/detail-view'], { queryParams: { category: data.category.name.toLowerCase(), id: data.id, title:data.title.toLowerCase() } });
  }

  searchData(value:any){
    
    this.productService.searchAds(value['text'], value['city']).subscribe(
      (data:any) =>{
        

        data = typeof data === 'string' ? JSON.parse(data) : data
        this.adsData = data['All_ads']
        this.processAdsData(this.adsData)

      }
    )
  }



}
