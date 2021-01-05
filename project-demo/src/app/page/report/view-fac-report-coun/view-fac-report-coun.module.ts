import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFacReportCounPageRoutingModule } from './view-fac-report-coun-routing.module';

import { ViewFacReportCounPage } from './view-fac-report-coun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewFacReportCounPageRoutingModule
  ],
  declarations: [ViewFacReportCounPage]
})
export class ViewFacReportCounPageModule {}
