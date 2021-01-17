import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudFacultyInfoPageRoutingModule } from './stud-faculty-info-routing.module';

import { StudFacultyInfoPage } from './stud-faculty-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudFacultyInfoPageRoutingModule
  ],
  declarations: [StudFacultyInfoPage]
})
export class StudFacultyInfoPageModule {}
