import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.page.html',
  styleUrls: ['./faculty-home.page.scss'],
})
export class FacultyHomePage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public navCtrl: NavController,
    public auth: AngularFireAuth,
    public db: AngularFirestore,
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  goToAccount() {
    this.router.navigate(['/faculty-account'])
  }

  goToStudentInfo() {
    this.router.navigate(['/student-info'])
  }

  goToReport() {
    this.router.navigate(['/student-info'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
  }
}
