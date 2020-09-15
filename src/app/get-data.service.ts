import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  // url = http://localhost:3000/users/ https://4ddf7176.ngrok.io/
  url = 'http://localhost:3000';
  public getAll() {
    return this.http.get(this.url + '/');
  }

}
