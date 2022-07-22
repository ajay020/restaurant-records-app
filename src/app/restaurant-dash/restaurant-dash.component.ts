import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData! : RestaurantData[] ;
  isAddClicked!: boolean;
  isUpdateClicked!: boolean;

  constructor(private fb: FormBuilder, private service: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    });
    this.getAllData();
  }

  changeButton(){
    // reset form 
    this.formValue.reset();

    // hide Update button ans display Add button
    this.isAddClicked = true;
    this.isUpdateClicked = false;
  }

  addRestaurant(){

    this.restaurantModelObj = {...this.formValue.value};

    this.service.postRestaurant(this.restaurantModelObj)
        .subscribe({
            next:(response) =>{
                console.log(response);  
                this.formValue.reset();
                this.getAllData();
            },
            error:(error) => {
                console.log( "something went wrong..",error);
            }
          })
  }

  getAllData(){
    this.service.getRestaurant().subscribe({
       next: (response) => {
            this.allRestaurantData = response
        }
    })
  }

  deleteRestaurant(data:any){
    this.service.deleteRestaurant(data.id).subscribe({
        next: response =>{ 
            console.log(response);
            this.getAllData();
            alert("Deleted successfully.");
        },
        error : error =>{
            console.log(error);
        }
    })
  }

  onEdit(data: RestaurantData){
    console.log(this.isAddClicked)

        this.isUpdateClicked = true;
        this.isAddClicked = false;

        this.restaurantModelObj.id = data.id;
        this.formValue.controls['name'].setValue(data.name);
        this.formValue.controls['email'].setValue(data.email);
        this.formValue.controls['mobile'].setValue(data.mobile);
        this.formValue.controls['address'].setValue(data.address);
        this.formValue.controls['service'].setValue(data.service);

  }
  updateRestaurant(){
    let data  = {id: this.restaurantModelObj.id, ...this.formValue.value};
    console.log(data);
    this.service.updateRestaurant(data, data.id).subscribe({
        next: (response) =>{
            console.log(response);
            this.getAllData();
            alert("Updated successfully!");
        }
    })
  }

}
