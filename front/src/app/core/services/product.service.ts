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


  createRealEstateAds(form:any, uploaded_image:any, subCategory:string){

    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('real_estate_uploaded_images', file, file.name);
      });
    }else{
    }
   
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append( 'category', '2' )
    formData.append('Propertytype', subCategory.toLowerCase())
    formData.append('TitleDeedType', form.get('titleDeedType').value)
    formData.append('Price', form.get('price').value)
    formData.append('Size', form.get('size').value)
    formData.append('NumberOfBedrooms', form.get('numberOfBedrooms').value)
    formData.append('FurnishingStatus', form.get('furnishingStatus').value)
    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/advertisement/real-estate/`, formData, {headers})
  }



  editRealEstateAds(form:any, uploaded_image:any, deletedImageId:any, ads_id:string){

    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('real_estate_uploaded_images', file, file.name);
      });
    }else{
    }
    if (deletedImageId.length > 0) {
      deletedImageId.forEach((id:any) => {
        formData.append(`delete_images`, id); // Append each integer as a string
      });
    }

    console.log('--------sadfasdfdsa-fasdfsadf-sadf-sdaf-sadf--------', form)
   
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append( 'category', '2' )
    formData.append('Propertytype', form.get('propertyType').value.replace(/ /g, "").toLowerCase() )
    formData.append('TitleDeedType', form.get('titleDeedType').value)
    formData.append('Price', form.get('price').value)
    formData.append('Size', form.get('size').value)
    formData.append('NumberOfBedrooms', form.get('numberOfBedrooms').value)
    formData.append('FurnishingStatus', form.get('furnishingStatus').value)
    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)

    console.log('--------sadfasdfdsa-fasdfsadf-sadf-sdaf-sadf--------', formData)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.apiUrl}/advertisement/ads-detail/realestate/${ads_id}`, formData, {headers})
  }

  createCarAds(form:any, uploaded_image:any, subCategory:string){

    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('uploaded_images', file, file.name);
      });
    }else{
    }
   
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append('category', '1' )
    formData.append('BodyType', subCategory.replace(/ /g, "").toLocaleLowerCase())
    formData.append('Mileage', form.get('mileage').value)
    formData.append('Price', form.get('price').value)
    formData.append('FuelType', form.get('fuelType').value)
    formData.append('TransmissionType', form.get('transmissionType').value)
    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/advertisement/car/`, formData, {headers})
  }

  editCarAds(form:any, uploaded_image:any, deletedImageId:any, ads_id:string){
    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('uploaded_images', file, file.name);
      });
    }else{
    }
    if (deletedImageId.length > 0) {
      deletedImageId.forEach((id:any) => {
        formData.append(`delete_images`, id); // Append each integer as a string
      });
    }
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append('category', '1' )
    formData.append('BodyType', form.get('bodyType').value.toLocaleLowerCase())
    formData.append('Mileage', form.get('mileage').value)
    formData.append('Price', form.get('price').value)
    formData.append('FuelType', form.get('fuelType').value)
    formData.append('TransmissionType', form.get('transmissionType').value)
    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)
    
    console.log('{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}', formData)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.patch(`${this.apiUrl}/advertisement/ads-detail/car/${ads_id}`, formData, {headers})
  }


  createOtherAds(form:any, uploaded_image:any, subCategory:string){

    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('other_uploaded_images', file, file.name);
      });
    }else{
    }
   
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append( 'category', '3' )
    formData.append('Price', form.get('price').value)
    formData.append('Propertytype', subCategory.replace(/ /g, "").toLocaleLowerCase())

    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/advertisement/otherAds/`, formData, {headers})
  }

  editOtherAds(form:any, uploaded_image:any, deletedImageId:any, ads_id:string){

    const token = localStorage.getItem('access_token')
    const user_id:any  = localStorage.getItem('user_id')
    const formData = new FormData();
    if (uploaded_image.length > 0){
      uploaded_image.forEach((file:any) => {
        formData.append('other_uploaded_images', file, file.name);
      });
    }else{
    }
    if (deletedImageId.length > 0) {
      console.log('Array before sending:', deletedImageId);
      deletedImageId.forEach((id:any) => {
        formData.append(`delete_images`, id); // Append each integer as a string
      });
    }
   
    formData.append('title',  form.get('title').value);
    formData.append('City',  form.get('city').value)
    formData.append('user', user_id)
    formData.append('category', '3' )
    formData.append('Price', form.get('price').value)
    formData.append('Propertytype', form.get('propertyType').value.replace(/ /g, "").toLowerCase())

    formData.append('Status', form.get('status').value)
    formData.append('description', form.get('description').value)

    console.log("<<<<<<<<<>>>>>>>>>>>>>:::::::::::::::", formData)
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.apiUrl}/advertisement/ads-detail/other/${ads_id}`, formData, {headers})
  }


  

}
