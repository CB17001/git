import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReportCounPageRoutingModule } from './view-report-coun-routing.module';

import { ViewReportCounPage } from './view-report-coun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewReportCounPageRoutingModule
  ],
  declarations: [ViewReportCounPage]
})
export class ViewReportCounPageModule {}
