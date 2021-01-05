import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAttendanceStdPage } from './view-attendance-std.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAttendanceStdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAttendanceStdPageRoutingModule {}
