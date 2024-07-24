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

}
