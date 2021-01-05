import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIssueStdPageRoutingModule } from './create-issue-std-routing.module';

import { CreateIssueStdPage } from './create-issue-std.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateIssueStdPageRoutingModule
  ],
  declarations: [CreateIssueStdPage]
})
export class CreateIssueStdPageModule {}
