import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentAccountPage } from './student-account.page';

const routes: Routes = [
  {
    path: '',
    component: StudentAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAccountPageRoutingModule {}
