import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm! :FormGroup ;  

    constructor(private formBuilder: FormBuilder,
         private httpClient: HttpClient,
         private router : Router
         ) { }
  
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
          name: [''],
          email: [''],
          mobile: [''],
          password: [''],
      })
    }
  
    signup(){
      this.httpClient.post("http://localhost:3000/signup", this.signupForm.value)
            .subscribe(response => {
                alert("Signup successful!");
                console.log(response);
                this.signupForm.reset();
                this.router.navigate(['login'])
            },
            error => {
                console.log(error);
                alert(error.message);
            }
            )
    }
}
