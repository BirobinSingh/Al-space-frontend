import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/v1';
  private apiUrl2='http://localhost:8000/api/v1/cabin'

  subject34$ = new Subject();
  cabinSubject$=new Subject();
  cabinServiceSubject$=new Subject();

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl2);
  }

  getService():Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/v1/service')
  }

  addCabin(body:any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/v1/cabin',body)
    .pipe(finalize(()=>this.cabinSubject$.next(1)));
  }
  addService(body:any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/v1/service',body)
    .pipe( finalize(() => this.subject34$.next(1))) ;
  }

  deleteCabin(id:any):Observable<any>{
    return this.http.delete<any>(`http://localhost:8000/api/v1/cabin/${id}`)
    .pipe(finalize(()=>this.cabinSubject$.next(1)));
  }
  deleteService(id:any):Observable<any>{
    return this.http.delete<any>(`http://localhost:8000/api/v1/service/${id}`)
    .pipe( finalize(() => this.subject34$.next(1))) ;
  }
  addCabinService(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8000/api/v1/cabinService`,body)
    .pipe(finalize(()=>this.cabinServiceSubject$.next(1)));
  }
  getCabinService(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8000/api/v1/cabinService/${id}`)
  }
  
  // addBoooking(body:any):Observable<any>{
  //   return this.http.post<any>('http://localhost:8000/api/v1/bookings',body)
  // }
  updateCabin(body:any,id:any):Observable<any>{
    return this.http.patch<any>(`http://localhost:8000/api/v1/cabin/${id}`,body)
  }
  updateCabinTransaction(body:any):Observable<any>{
    return this.http.patch<any>(`http://localhost:8000/api/v1/cabin/`,body)
  }
  addJobPosting(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8000/api/v1/jobposting`,body)
  }
  payment(body:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8000/api/v1/payment`,body)
  }
  addboooking(body:any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/v1/bookingTransaction',body)
  }
  updateBooking(body:any):Observable<any>{
    return this.http.patch<any>('http://localhost:8000/api/v1/bookingTransaction',body)
  }
}
