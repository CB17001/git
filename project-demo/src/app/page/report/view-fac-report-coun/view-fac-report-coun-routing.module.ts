import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFacReportCounPage } from './view-fac-report-coun.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFacReportCounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFacReportCounPageRoutingModule {}
