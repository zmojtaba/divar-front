import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../layout/search/search.component';
import { NbIconModule, NbListModule, NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { text } from 'stream/consumers';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NbStatusService]
})
export class HomeComponent implements OnInit {
  adsData:any;

  constructor(
    private productService: ProductService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.productService.getHomeAdsData().subscribe(
      (data:any) =>{
        this.adsData = data['All_ads']
        this.processAdsData(this.adsData)
        console.log(data)
        console.log(typeof(data['All_ads'][0]['images']))
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
    console.log('************************home emitter***************',value)
    this.productService.searchAds(value['text'], value['city']).subscribe(
      data =>{
        console.log(data, 'ooooooooooooooooooooooooo')
      }
    )
  }



}
