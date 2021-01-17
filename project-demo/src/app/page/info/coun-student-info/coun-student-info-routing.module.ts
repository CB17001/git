import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounStudentInfoPage } from './coun-student-info.page';

const routes: Routes = [
  {
    path: '',
    component: CounStudentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounStudentInfoPageRoutingModule {}
