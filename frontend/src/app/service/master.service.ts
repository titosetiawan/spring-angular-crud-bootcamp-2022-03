import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Products} from "../model/products.model";

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }

  list(): Observable<any>{
    return this.http.get(environment.baseUrl+'/list').pipe(map(data => data))
  }
  insert(data: Products): Observable<any>{
    let url = '/insert';
    return this.http.post(environment.baseUrl+url, data).pipe(map(data => data))
  }
  getId(id : number): Observable<any>{
    return this.http.get(environment.baseUrl+'/findById/'+id,).pipe(map(data => data))
  }
}
