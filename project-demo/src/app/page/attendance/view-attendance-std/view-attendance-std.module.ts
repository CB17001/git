import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAttendanceStdPageRoutingModule } from './view-attendance-std-routing.module';

import { ViewAttendanceStdPage } from './view-attendance-std.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAttendanceStdPageRoutingModule
  ],
  declarations: [ViewAttendanceStdPage]
})
export class ViewAttendanceStdPageModule {}
