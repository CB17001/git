import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAppointmentCounsellorPageRoutingModule } from './create-appointment-counsellor-routing.module';

import { CreateAppointmentCounsellorPage } from './create-appointment-counsellor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateAppointmentCounsellorPageRoutingModule
  ],
  declarations: [CreateAppointmentCounsellorPage]
})
export class CreateAppointmentCounsellorPageModule {}
