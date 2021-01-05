import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAttendanceCounPage } from './view-attendance-coun.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAttendanceCounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAttendanceCounPageRoutingModule {}
