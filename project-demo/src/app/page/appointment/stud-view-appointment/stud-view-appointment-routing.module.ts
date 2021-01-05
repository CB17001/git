import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudViewAppointmentPage } from './stud-view-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: StudViewAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudViewAppointmentPageRoutingModule {}
