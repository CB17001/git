import { Component } from '@angular/core';
import { firestore } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: firestore.Timestamp;
}
