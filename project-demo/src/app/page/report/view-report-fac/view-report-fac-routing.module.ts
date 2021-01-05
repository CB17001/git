import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportFacPage } from './view-report-fac.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReportFacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReportFacPageRoutingModule {}
