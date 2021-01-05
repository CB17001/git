import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIssueStdPage } from './create-issue-std.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIssueStdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIssueStdPageRoutingModule {}
