import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudCounsellorInfoPageRoutingModule } from './stud-counsellor-info-routing.module';

import { StudCounsellorInfoPage } from './stud-counsellor-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudCounsellorInfoPageRoutingModule
  ],
  declarations: [StudCounsellorInfoPage]
})
export class StudCounsellorInfoPageModule {}
