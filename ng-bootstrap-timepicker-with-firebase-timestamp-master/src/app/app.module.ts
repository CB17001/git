import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFirestoreAdapter } from './ngb-date-firestore-adapter.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateFirestoreAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
