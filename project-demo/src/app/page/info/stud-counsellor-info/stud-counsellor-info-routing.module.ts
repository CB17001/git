import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudCounsellorInfoPage } from './stud-counsellor-info.page';

const routes: Routes = [
  {
    path: '',
    component: StudCounsellorInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudCounsellorInfoPageRoutingModule {}
