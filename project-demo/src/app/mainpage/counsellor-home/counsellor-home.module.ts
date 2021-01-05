import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounsellorHomePageRoutingModule } from './counsellor-home-routing.module';

import { CounsellorHomePage } from './counsellor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounsellorHomePageRoutingModule
  ],
  declarations: [CounsellorHomePage]
})
export class CounsellorHomePageModule {}
