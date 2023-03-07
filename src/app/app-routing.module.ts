import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentsComponent } from './components/add-appointments/add-appointments.component';
import { AddDoctorsComponent } from './components/add-doctors/add-doctors.component';
import { ListAppointmentsComponent } from './components/list-appointments/list-appointments.component';
import { ListDoctorsComponent } from './components/list-doctors/list-doctors.component';

const routes: Routes = [
  { path: '', component: ListAppointmentsComponent },
  { path: 'list-doctors', component: ListDoctorsComponent },
  { path: 'add-appointment', component: AddAppointmentsComponent },
  { path: 'add-appointment/:id', component: AddAppointmentsComponent },
  { path: 'add-doctor', component: AddDoctorsComponent },
  { path: 'add-doctor/:id', component: AddDoctorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
