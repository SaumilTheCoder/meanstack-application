import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DummydataServiceService {
  url = "https://jsonplaceholder.typicode.com/todos";

  constructor(private http:HttpClient) { }

  users()
  {
      return this.http.get(this.url);
  }
}
