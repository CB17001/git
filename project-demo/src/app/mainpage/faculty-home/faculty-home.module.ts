import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacultyHomePageRoutingModule } from './faculty-home-routing.module';

import { FacultyHomePage } from './faculty-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacultyHomePageRoutingModule
  ],
  declarations: [FacultyHomePage]
})
export class FacultyHomePageModule {}
