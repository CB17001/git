import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportCounPage } from './view-report-coun.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReportCounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReportCounPageRoutingModule {}
