import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounStudentInfoPageRoutingModule } from './coun-student-info-routing.module';

import { CounStudentInfoPage } from './coun-student-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CounStudentInfoPageRoutingModule
  ],
  declarations: [CounStudentInfoPage]
})
export class CounStudentInfoPageModule {}
