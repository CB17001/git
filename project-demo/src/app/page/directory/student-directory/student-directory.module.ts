import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDirectoryPageRoutingModule } from './student-directory-routing.module';

import { StudentDirectoryPage } from './student-directory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDirectoryPageRoutingModule
  ],
  declarations: [StudentDirectoryPage]
})
export class StudentDirectoryPageModule {}
