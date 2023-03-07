import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import {DatePipe} from '@angular/common'

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html'
})
export class AddAppointmentsComponent implements OnInit {

  todayDate:Date = new Date()
  doctors: any[] | undefined
  data: any
  isUpdate: boolean = false
  appointmentId: any
  form = new FormGroup({
    patientName: new FormControl('', [Validators.required]),
    patientEmail: new FormControl(),
    patientMobile: new FormControl(),
    dob: new FormControl(),
    appointmentDate: new FormControl(),
    doctorId: new FormControl()
  })

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdate = this.appointmentId ? true : false
    if (this.isUpdate) {
      this.appointmentService.getAppointmentById(this.appointmentId).subscribe(data => {
        let appointmentDate_ = data.appointmentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3")
        this.form.patchValue({
          patientName: data.patientName,
          patientEmail: data.patientEmail,
          patientMobile: data.patientMobile,
          dob: data.dob,
          appointmentDate: new Date(appointmentDate_),
          doctorId: data.doctorId
        })
      })
    }

    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    })
    
  }

  onFormSubmit() {
    this.data = this.form.value
    this.data.appointmentDate = this.datePipe.transform(this.data.appointmentDate, 'dd-MM-yyyy');
    if (this.isUpdate) {
      this.data.id = this.appointmentId;
      this.appointmentService.updateAppointment(this.data).subscribe(data => {
        console.log(data)
      })
    } else {
      this.appointmentService.addAppointment(this.data).subscribe(data => {
        console.log(data)
      })
    }
    this.router.navigate(['']);
  }

}
