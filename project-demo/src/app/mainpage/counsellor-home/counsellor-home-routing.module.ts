import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounsellorHomePage } from './counsellor-home.page';

const routes: Routes = [
  {
    path: '',
    component: CounsellorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounsellorHomePageRoutingModule {}
