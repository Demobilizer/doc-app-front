import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url = "http://localhost:8080/api/doctor";

  constructor(private http: HttpClient) { }

  // Add Doctor - Create
  addDoctor(doctor: Doctor){
    return this.http.post<Doctor>(`${this.url}`, doctor)
  }

  // Get Doctors - Read
  getDoctors(): Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }

  // Get Doctor by id - Read
  getDoctorById(id: number): Observable<Doctor>{
    return this.http.get<Doctor>(`${this.url}/${id}`)
  }

  // Update Doctor - Update
  updateDoctor(doctor: Doctor): Observable<any>{
    return this.http.put<any>(`${this.url}`, doctor)
  }

  // Delete Doctor - Delete
  deleteDoctor(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
