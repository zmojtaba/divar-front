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

@Component({
  selector: 'app-create-product',
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
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  providers: [NbStatusService ,],
})
export class CreateProductComponent implements OnInit {
  category:string|null;
  subCategory:any;
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
  realEstateTitleDeedType = [ 'Turkish Title Deed', 'Equivalent Title Deed', 'Foreign Title Deed', 'State Social Housing', 'Martyr Child ', 'Allocation', 'Veteran Points', 'Leasehold']
  realEstateNumberOfBedrooms = [  'Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms',  '4 Bedrooms', '5+ Bedrooms']
  realEstateFurnishingStatus = [ 'Unfurnished', 'Partially Furnished' ,'Furnished', 'Only White Goods' ]
  carForm: FormGroup;
  realEstateForm:FormGroup;
  otherForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.subCategory = this.route.snapshot.paramMap.get('subCategory');

    this.carForm = this.fb.group({
      title: ['', Validators.required,],
      city: ['Lefkosa'],
      bodyType: ['', Validators.required,],
      mileage: ['',[ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")]],
      fuelType: ['', Validators.required,],
      transmissionType: ['', Validators.required,],
      status: ['', Validators.required,],
      price: ['', [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")],],
      description: ['', Validators.required,]
    });

    this.realEstateForm = this.fb.group({
      title: ['', Validators.required,],
      city: ['Lefkosa'],
      titleDeedType: ['', Validators.required,],
      size: ['', [ Validators.required,Validators.pattern("^[0-9]+(\\.[0-9]*)?$")],],
      numberOfBedrooms: ['', Validators.required,],
      furnishingStatus: ['', Validators.required,],
      price: ['', [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")],],
      description: ['', Validators.required,],
      status:['', Validators.required]
    });

    this.otherForm = this.fb.group({
      title: ['', Validators.required,],
      city: ['Lefkosa'],
      price: ['', [ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]*)?$")],],
      description: ['', Validators.required,],
      status:['', Validators.required]
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

  onCarSubmit(form:any){
    this.clickedOnCarSubmit = true;
    
    if (form.status == "VALID"){
      this.productService.createCarAds(form, this.selectedFiles, this.subCategory).subscribe(
        data => {
          this.router.navigate(['profile', 'my-ads']);
        }
      )
    }
  }
  onRealEstateSubmit(form:any){
    this.clickedOnRealEstateSubmit = true

    if (form.status == "VALID"){
      this.productService.createRealEstateAds(form, this.selectedFiles, this.subCategory).subscribe(
        data =>{
          this.router.navigate(['profile', 'my-ads']);
        }
      )
    }
  }

  onOtherSubmit(form:any){
    this.clickedOnOtherSubmit = true


    if (form.status){
      this.productService.createOtherAds(form, this.selectedFiles, this.subCategory).subscribe(
        data =>{
          this.router.navigate(['profile', 'my-ads']);
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
