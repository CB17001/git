import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIssueStdPageRoutingModule } from './view-issue-std-routing.module';

import { ViewIssueStdPage } from './view-issue-std.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewIssueStdPageRoutingModule
  ],
  declarations: [ViewIssueStdPage]
})
export class ViewIssueStdPageModule {}
