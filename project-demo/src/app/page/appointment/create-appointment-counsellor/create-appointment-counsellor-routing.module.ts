import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAppointmentCounsellorPage } from './create-appointment-counsellor.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAppointmentCounsellorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAppointmentCounsellorPageRoutingModule {}
