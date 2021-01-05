import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAttendanceCounPageRoutingModule } from './view-attendance-coun-routing.module';

import { ViewAttendanceCounPage } from './view-attendance-coun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAttendanceCounPageRoutingModule
  ],
  declarations: [ViewAttendanceCounPage]
})
export class ViewAttendanceCounPageModule {}
