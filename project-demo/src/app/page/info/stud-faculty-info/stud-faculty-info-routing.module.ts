import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudFacultyInfoPage } from './stud-faculty-info.page';

const routes: Routes = [
  {
    path: '',
    component: StudFacultyInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudFacultyInfoPageRoutingModule {}
