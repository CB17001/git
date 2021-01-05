import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellorAccountPage } from './counsellor-account.page';

const routes: Routes = [
  {
    path: '',
    component: CounsellorAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounsellorAccountPageRoutingModule {}
