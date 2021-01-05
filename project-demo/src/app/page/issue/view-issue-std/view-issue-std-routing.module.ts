import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIssueStdPage } from './view-issue-std.page';

const routes: Routes = [
  {
    path: '',
    component: ViewIssueStdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewIssueStdPageRoutingModule {}
