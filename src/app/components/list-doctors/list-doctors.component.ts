import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html'
})
export class ListDoctorsComponent implements OnInit {

  doctors: any[] | undefined

  constructor(
    private service: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getDoctors().subscribe(data => {
      this.doctors = data;
    })
  }

  onAddDoctor() {
    this.router.navigate(['add-doctor']);
  }

  onAddAppointment() {
    this.router.navigate(['add-appointment']);
  }

  deleteDoctor(id: number){
    this.service.deleteDoctor(id).subscribe(data => {
      this.doctors = this.doctors?.filter(doc => doc.id !== id);
    })
  }

  updateDoctor(id: number){
    this.router.navigate(['add-doctor', id]);
  }

}
