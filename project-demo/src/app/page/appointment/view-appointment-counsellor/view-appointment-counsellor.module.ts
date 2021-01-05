import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAppointmentCounsellorPageRoutingModule } from './view-appointment-counsellor-routing.module';

import { ViewAppointmentCounsellorPage } from './view-appointment-counsellor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAppointmentCounsellorPageRoutingModule
  ],
  declarations: [ViewAppointmentCounsellorPage]
})
export class ViewAppointmentCounsellorPageModule {}
