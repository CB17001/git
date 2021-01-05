import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounsellorAccountPageRoutingModule } from './counsellor-account-routing.module';

import { CounsellorAccountPage } from './counsellor-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CounsellorAccountPageRoutingModule
  ],
  declarations: [CounsellorAccountPage]
})
export class CounsellorAccountPageModule {}
