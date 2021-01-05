import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReportFacPageRoutingModule } from './view-report-fac-routing.module';

import { ViewReportFacPage } from './view-report-fac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReportFacPageRoutingModule
  ],
  declarations: [ViewReportFacPage]
})
export class ViewReportFacPageModule {}
