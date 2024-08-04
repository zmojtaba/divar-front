import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink, ActivatedRoute } from '@angular/router'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule, NbListModule } from '@nebular/theme';
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

@Component({
  selector: 'app-profile-detail',
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
    RouterModule
  ],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss',
  providers: [NbStatusService]
})
export class ProfileDetailComponent implements OnInit {
  constructor(
    private profileSerice:ProfileService, 
    private route: ActivatedRoute, 
    private router: Router,
    private profileService: ProfileService,
    private producutService: ProductService
  ){

  }
  title: any;
  myAds:any[] = []
  savedAds:any[] = []
  adsData:any[] = []
  
  setProfileData(data: any) {
    try {
      this.myAds = Array.isArray(data.MyAds) ? data.MyAds : JSON.parse(data.MyAds);
    } catch (error) {
      console.error('Error parsing MyAds:', error, 'Raw data:', data.MyAds);
      this.myAds = [];
    }
    
    try {
      this.savedAds = Array.isArray(data.Saved_Ads) ? data.Saved_Ads : JSON.parse(data.Saved_Ads);
    } catch (error) {
      console.error('Error parsing Saved_Ads:', error, 'Raw data:', data.Saved_Ads);
      this.savedAds = [];
    }
  }

  setAdsData(title: string | null) {
    if (title) {
      if (title.toLowerCase() === 'my-ads') {
        this.adsData = this.myAds;
      } else if (title.toLowerCase() === 'saved-ads') {
        this.adsData = this.savedAds;
      } else if (title.toLowerCase() === 'my-visit') {
        this.adsData = this.myAds;
      }
    }
  }

  processAdsData(ads_data:any[]){
    if(ads_data.length > 0){
      for (let ads of ads_data){
        ads.images = typeof ads.images === 'string' ? JSON.parse(ads.images) : ads.images;
      }
    }
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    this.profileService.profileData.subscribe(data=>{

      if (data){
        const response = typeof data === 'string' ? JSON.parse(data) : data; 
        this.setProfileData(response)
        this.setAdsData(this.title)
        this.processAdsData(this.adsData)
      }
    })


    if (this.adsData.length==0){
      this.profileService.getProfileService().subscribe(data=>{
        const response = typeof data === 'string' ? JSON.parse(data) : data;
        this.setProfileData(response)
        this.setAdsData(this.title)
        this.processAdsData(this.adsData)
        
      })
    }

  }

  onDetailView(data:any){
    this.producutService.adsDetailData.next(data)
    this.router.navigate(['/ads/detail-view'], { queryParams: { category: data.category.name.toLowerCase(), id: data.id, title:data.title.toLowerCase() } });
  }

  }


