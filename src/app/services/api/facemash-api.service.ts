import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class FacemashApiService {
  
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    let url = config.API_PATH;
    return this.http.get(url);
  }
}
