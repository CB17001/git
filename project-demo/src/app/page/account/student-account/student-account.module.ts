import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAccountPageRoutingModule } from './student-account-routing.module';

import { StudentAccountPage } from './student-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentAccountPageRoutingModule
  ],
  declarations: [StudentAccountPage]
})
export class StudentAccountPageModule {}
