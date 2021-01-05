import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveAppointmentCounsellorPage } from './approve-appointment-counsellor.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveAppointmentCounsellorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveAppointmentCounsellorPageRoutingModule {}
