import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  list(): Observable<any>{
    return this.http.get(environment.baseUrl+'/list').pipe(map(data => data))
  }
}
