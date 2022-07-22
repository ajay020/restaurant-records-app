import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! :FormGroup ;  

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private httpClient: HttpClient
     ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: [''],
        password: [''],
    })
  }

  login(){
    this.httpClient.get<any>("http://localhost:3000/signup")
            .subscribe(users => {
                const {email, password} = this.loginForm.value; 
                const user = users.find( (user:any) => user.email === email && user.password === password);
                console.log(user);
                if(user){
                    alert("Login successful");
                    this.router.navigate(['restaurant'])
                }else{
                    alert("Wrong credentials");
                }
            },
            error =>{
                alert(error.message);
            }
            )
  }

}
