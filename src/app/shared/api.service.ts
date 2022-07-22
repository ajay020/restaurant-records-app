import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    url = "http://localhost:3000/posts"
  constructor(private _httpClient: HttpClient) { }

  postRestaurant(data: any){
   return  this._httpClient.post(this.url, data).pipe(map( (res:any) => res));
  }

  getRestaurant(){
    return  this._httpClient.get(this.url).pipe(map( (res:any) => res));
   }

   deleteRestaurant(id: number){
    return  this._httpClient.delete(this.url + "/"+id).pipe(map( (res:any) => res));
   }

   updateRestaurant(data: any, id: number){
    return  this._httpClient.put(this.url + "/"+id, data).pipe(map( (res:any) => res));
   }
}

