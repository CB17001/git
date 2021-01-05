import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudViewAppointmentPageRoutingModule } from './stud-view-appointment-routing.module';

import { StudViewAppointmentPage } from './stud-view-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StudViewAppointmentPageRoutingModule
  ],
  declarations: [StudViewAppointmentPage]
})
export class StudViewAppointmentPageModule {}
