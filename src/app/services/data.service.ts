import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private httpClient: HttpClient ) { }

  public query(data: any) {
    return this.httpClient.post(`${environment.url}/query.php`, data);
  }
}
