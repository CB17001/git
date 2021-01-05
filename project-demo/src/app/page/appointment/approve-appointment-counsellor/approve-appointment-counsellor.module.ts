import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveAppointmentCounsellorPageRoutingModule } from './approve-appointment-counsellor-routing.module';

import { ApproveAppointmentCounsellorPage } from './approve-appointment-counsellor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveAppointmentCounsellorPageRoutingModule
  ],
  declarations: [ApproveAppointmentCounsellorPage]
})
export class ApproveAppointmentCounsellorPageModule {}
