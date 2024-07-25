import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl                =   environment.apiUrl
  adsDetailData          =   new BehaviorSubject<any>(null)
  _searchByCategory  = new BehaviorSubject<any>(null)

  constructor(private http:HttpClient,) { }

  getAdsDetailData(category:string, id:string){
    return this.http.get(`${this.apiUrl}/advertisement/ads-detail/${category}/${id}`)
  }

  getHomeAdsData(){
    return this.http.get(`${this.apiUrl}/advertisement/Home/`)
  }

  searchAds(text:string, city:string){
    return this.http.post(`${this.apiUrl}/advertisement/search-ads/`, {
      "title":text.toLocaleLowerCase(),
      "city":city.toLocaleLowerCase()
    });
  }

  searchByCategory(category:string, subcategory:string){
    let sub = subcategory.replace(/ /g, "").toLocaleLowerCase()
    return this.http.get(`${this.apiUrl}/advertisement/category/${category}/${sub}`)
  }

  // sendImageRequest() {
  //   const formData = new FormData();

  //   // Add files to FormData
  //   this.selectedFiles.forEach(file => {
  //     formData.append('uploaded_images', file, file.name);
  //   });

  //   // Append other form fields if needed
  //   formData.append('title', this.productForm.get('title').value);
  //   formData.append('city', this.productForm.get('city').value);
  //   // Add other fields similarly...

  //   this.http.post(`${this.apiUrl}/advertisement/category/create-ads`, formData).subscribe(
  //     response => {
  //       console.log('Upload successful!', response);
  //     },
  //     error => {
  //       console.error('Upload failed!', error);
  //     }
  //   );
  // }

}
