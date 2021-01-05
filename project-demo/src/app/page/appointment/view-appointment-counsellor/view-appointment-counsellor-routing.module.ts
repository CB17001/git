import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAppointmentCounsellorPage } from './view-appointment-counsellor.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAppointmentCounsellorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAppointmentCounsellorPageRoutingModule {}
