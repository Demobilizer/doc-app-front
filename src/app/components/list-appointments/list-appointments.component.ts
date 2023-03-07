import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html'
})
export class ListAppointmentsComponent implements OnInit {

  appointments: any[] | undefined

  constructor(
    private service: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getAppointments().subscribe(data => {
      this.appointments = data;
    })
  }

  onAddDoctor() {
    this.router.navigate(['add-doctor']);
  }

  onAddAppointment() {
    this.router.navigate(['add-appointment']);
  }

  deleteAppointment(id: number){
    this.service.deleteAppointment(id).subscribe(data => {
      this.appointments = this.appointments?.filter(app => app.id !== id);
    })
  }

  updateAppointment(id: number){
    this.router.navigate(['add-appointment', id]);
  }

}
