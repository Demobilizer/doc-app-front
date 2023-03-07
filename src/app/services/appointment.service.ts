import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url = "http://localhost:8080/api/appointment";

  constructor(private http: HttpClient) { }

  // Add Appointment - Create
  addAppointment(appointment: Appointment){
    return this.http.post<Appointment>(`${this.url}`, appointment)
  }

  // Get Appointments - Read
  getAppointments(): Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }

  // Get Appointment by id - Read
  getAppointmentById(id: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${this.url}/${id}`)
  }

  // Update Appointment - Update
  updateAppointment(appointment: Appointment): Observable<any>{
    return this.http.put<any>(`${this.url}`, appointment)
  }

  // Delete Appointment - Delete
  deleteAppointment(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }
}
