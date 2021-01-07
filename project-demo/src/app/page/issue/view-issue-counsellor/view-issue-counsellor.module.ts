import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIssueCounsellorPageRoutingModule } from './view-issue-counsellor-routing.module';

import { ViewIssueCounsellorPage } from './view-issue-counsellor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewIssueCounsellorPageRoutingModule
  ],
  declarations: [ViewIssueCounsellorPage]
})
export class ViewIssueCounsellorPageModule {}
