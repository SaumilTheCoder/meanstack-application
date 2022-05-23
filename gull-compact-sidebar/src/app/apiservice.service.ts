import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Student } from './service/student';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  REST_API:string = "http://localhost:9000/api/";
  //Set Http Headers
  httpHeader = new HttpHeaders().set('Content-Type','application/json')
  constructor(private httpClient:HttpClient) { }

  AddStudnet(data:Student):Observable<any>{
    let API_URL = `${this.REST_API}/forms/basic`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
    
  }

  getStudent(){
    // alert("hii123");
    return this.httpClient.get(`${this.REST_API}`);
  }

  // get Single data..
  
  getBook(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeader}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )    
  }

  studentdelete(id:any):Observable<any>{
    // alert("hii");
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers:this.httpHeader}).pipe(
      catchError(this.handleError)
    )
  }
  //update book Data..
  updateBook(id:any,data:any):Observable<any>{
    // alert("hii");
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, {headers:this.httpHeader}).pipe(
      catchError(this.handleError)
    )
  }

   //Handle Error
   handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent)
    {
      // Handle the Clinet side Error
      errorMessage = error.error.message;
    }
    else{
      // Handle The Server side Error
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
