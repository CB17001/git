import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDirectoryPage } from './student-directory.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDirectoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDirectoryPageRoutingModule {}
