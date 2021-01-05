import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacultyAccountPageRoutingModule } from './faculty-account-routing.module';

import { FacultyAccountPage } from './faculty-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacultyAccountPageRoutingModule
  ],
  declarations: [FacultyAccountPage]
})
export class FacultyAccountPageModule {}
