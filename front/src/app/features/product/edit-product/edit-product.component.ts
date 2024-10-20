import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbListModule, NbStatusService } from '@nebular/theme';
import { ProductService } from '../../../core/services/product.service';
import { UtilsService } from '../../../core/services/utils.service';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    NbEvaIconsModule, 
    NbIconModule, 
    MatListModule,
    NbListModule,
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  providers: [NbStatusService],
})
export class EditProductComponent  implements OnInit{
  category:any;
  adsId:any;
  adsData:any;
  clickedOnCarSubmit = false;
  clickedOnRealEstateSubmit = false;
  clickedOnOtherSubmit=false;
  selectedCity: string = 'Lefkosa';
  selectedBodyType:string;
  selectedFuelType:string;
  selectedTransmissionType: string;
  selectedCarStatus: string;
  selectedFiles: File[] = [];
  

  cities = ['Lefkosa', 'Grine', 'Gazimagusa', 'Guzelyurt', 'Iskele', 'Lefke'];
  carBodyTypes = ['Cabriolet', 'Coupe', 'Hatch Back 5 Door', 'Hatch Back 3 Door', 'Sedan', 'Stationwagon', 'SUV'];
  carFuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  carTransmissionTypes = ['Manual', 'Automatic', 'Semi-Automatic'];
  statuses = ['Used', 'Unused'];
  realEstateTitleDeedType =     [ 'Turkish Title Deed', 'Equivalent Title Deed', 'Foreign Title Deed', 'State Social Housing', 'Martyr Child ', 'Allocation', 'Veteran Points', 'Leasehold']
  realEstateNumberOfBedrooms =  [  'Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms',  '4 Bedrooms', '5+ Bedrooms']
  realEstateFurnishingStatus =  [ 'Unfurnished', 'Partially Furnished' ,'Furnished', 'Only White Goods' ]
  realEstatePropertyType = ["Apartment", "House", "Villa", "Studio", "Penthouse", "Residence", "Under Construction Building", "Land", "Commercial Property", "Warehouse"]
  otherPropertyType = ["Digital Goods", "Kitchen", "Intertainment", "Personal Items"]
  carForm: FormGroup;
  realEstateForm:FormGroup;
  otherForm:FormGroup;
  priceStatus:string;
  priceTypesStatus = ['USD', 'EUR', 'TRY']
  language: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private utilService:UtilsService
  ){}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.adsId = this.route.snapshot.paramMap.get('ads_id');
    this.priceStatus = "USD"
    this.language = this.utilService.checkLan()

    this.productService.adsDetailData.subscribe(
      (data:any) => {
        if (data){
          this.adsData = data
          this.adsData.images = typeof this.adsData.images === 'string' ? JSON.parse(this.adsData.images) : this.adsData.images;
          
          this.initialCarForm()
          this.initialOtherForm()
          this.initialRealStateForm()
        }else{
          this.productService.getAdsDetailData(this.category, this.adsId).subscribe(
            data =>{
              
              this.adsData = data
              this.adsData.images = typeof this.adsData.images === 'string' ? JSON.parse(this.adsData.images) : this.adsData.images;
              this.initialCarForm()
              this.initialOtherForm()
              this.initialRealStateForm()
            }
          )
        }
      }
    )
    
  }

  deletedImageId:any = []
  onDeleteImage(id:string){
    this.deletedImageId.push(+id)
  }

  initialCarForm(){
    this.carForm = this.fb.group({
      title: [this.adsData.title, Validators.required,],
      city: [this.adsData.City],
      bodyType: [this.adsData.BodyType, Validators.required,],
      mileage: [this.adsData.Mileage,  [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      fuelType: [this.adsData.FuelType, Validators.required,],
      transmissionType: [this.adsData.TransmissionType, Validators.required,],
      status: [this.adsData.Status, Validators.required,],
      price: [this.adsData.Price,  [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      description: [this.adsData.description, Validators.required,]
    });

  }

  initialRealStateForm(){
    this.realEstateForm = this.fb.group({
      title: [this.adsData.title, Validators.required,],
      city: [this.adsData.City],
      titleDeedType: [this.adsData.TitleDeedType, Validators.required,],
      size: [this.adsData.Size, [ Validators.required,  Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      numberOfBedrooms: [this.adsData.NumberOfBedrooms, Validators.required,],
      furnishingStatus: [this.adsData.FurnishingStatus, Validators.required,],
      price: [this.adsData.Price, [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      description: [this.adsData.description, Validators.required,],
      status:[this.adsData.Status, Validators.required],
      propertyType : [this.adsData.Propertytype]
    });
  }

  initialOtherForm(){
    this.otherForm = this.fb.group({
      title: [this.adsData.title, Validators.required,],
      city: [this.adsData.City],
      price: [this.adsData.Price,  [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      description: [this.adsData.description, Validators.required,],
      status:[this.adsData.Status, Validators.required],
      propertyType : [this.adsData.Propertytype]
    });
  }


  selectCarCity(city: string) {
    this.carForm.patchValue({ city });
  }
  selectRealEstateCity(city:string){
    this.realEstateForm.patchValue({city})
  }
  selectOtherCity(city:string){
    this.otherForm.patchValue({city})
  }

  selectBodyType(bodyType: string) {
    this.carForm.patchValue({ bodyType });
  }

  selectTitleDeedType(titleDeedType:string){
    this.realEstateForm.patchValue({titleDeedType})
  }
  selectPropertyType(propertyType:string){
    this.realEstateForm.patchValue({propertyType})
  }
  selectOtherPropertyType(propertyType:string){
    this.otherForm.patchValue({propertyType})
  }

  selectFuelType(fuelType: string) {
    this.carForm.patchValue({ fuelType });
  }
  selectNumOfBedrooms(numberOfBedrooms:string){
    this.realEstateForm.patchValue({numberOfBedrooms})
  }

  selectTransmissionType(transmissionType: string) {
    this.carForm.patchValue({ transmissionType });
  }
  
  selectFurnishingStatus(furnishingStatus:string){
    this.realEstateForm.patchValue({furnishingStatus})
  }

  selectCarStatus(status: string) {
    this.carForm.patchValue({ status });
  }

  selectRealEstateStatus(status: string) {
    this.realEstateForm.patchValue({ status });
  }
  selectOtherStatus(status:string){
    this.otherForm.patchValue({ status });
  }
  selectPriceTypeStatus(status:string){
    this.priceStatus = status;
  }

  onCarSubmit(form:any){
    this.clickedOnCarSubmit = true;
    if (form.status == "VALID"){
      this.productService.editCarAds(form, this.selectedFiles, this.deletedImageId, this.adsData.id).subscribe(
        data=> {
          this.router.navigate(['profile', 'my-ads']);
        }
      )
    }
  }
  

  onRealEstateSubmit(form:any){
    
    this.clickedOnRealEstateSubmit = true;
    if (form.status == "VALID"){
      this.productService.editRealEstateAds(form, this.selectedFiles, this.deletedImageId, this.adsData.id).subscribe(
        data=> {
          this.router.navigate(['profile', 'my-ads']);
        }, err => {
        }
      )
    }
  }

  onOtherSubmit(form:any){
    this.clickedOnOtherSubmit = true

    if (form.status){
      
      this.productService.editOtherAds(form, this.selectedFiles, this.deletedImageId, this.adsData.id).subscribe(
        data=> {
          this.router.navigate(['profile', 'my-ads']);
        }, err => {
          
        }
      )
    }
  }


  previewImages: string[] = [];
  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.previewImages = [];
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.previewImages.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }




}
