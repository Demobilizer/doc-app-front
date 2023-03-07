import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-add-doctors',
  templateUrl: './add-doctors.component.html'
})
export class AddDoctorsComponent implements OnInit {

  data: any
  isUpdate: boolean = false
  doctorId: any
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    specification: new FormControl(),
    fromTime: new FormControl(),
    toTime: new FormControl(),
    maxAppointmentPerDay: new FormControl()
  })

  constructor(
    private service: DoctorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdate = this.doctorId ? true : false
    if (this.isUpdate) {
      this.service.getDoctorById(this.doctorId).subscribe(data => {
        // let appointmentDate_ = data.appointmentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3")
        this.form.patchValue({
          name: data.name,
          specification: data.specification,
          fromTime: data.fromTime,
          toTime: data.toTime,
          maxAppointmentPerDay: data.maxAppointmentPerDay
        })
      })
    }
  }

  onFormSubmit() {
    this.data = this.form.value
    console.log(this.data)
    if (this.isUpdate) {
      this.service.updateDoctor(this.data).subscribe(data => {
        console.log(data)
      })
    } else {
      this.service.addDoctor(this.data).subscribe(data => {
        console.log(data)
      })
    }
    this.router.navigate(['list-doctors']);
  }

}
