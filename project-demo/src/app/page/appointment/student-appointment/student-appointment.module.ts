import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAppointmentPageRoutingModule } from './student-appointment-routing.module';

import { StudentAppointmentPage } from './student-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudentAppointmentPageRoutingModule
  ],
  declarations: [StudentAppointmentPage]
})
export class StudentAppointmentPageModule {}
