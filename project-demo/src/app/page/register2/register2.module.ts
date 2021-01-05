import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Register2PageRoutingModule } from './register2-routing.module';

import { Register2Page } from './register2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Register2PageRoutingModule
  ],
  declarations: [Register2Page]
})
export class Register2PageModule {}
