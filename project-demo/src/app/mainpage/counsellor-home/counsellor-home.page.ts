import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-counsellor-home',
  templateUrl: './counsellor-home.page.html',
  styleUrls: ['./counsellor-home.page.scss'],
})
export class CounsellorHomePage implements OnInit {

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
    this.router.navigate(['/counsellor-account'])
  }

  goToAppointment() {
    this.router.navigate(['/view-appointment-counsellor'])
  }

  goToIssue() {
    this.router.navigate(['/view-issue-counsellor'])
  }

  goToAttendance() {
    this.router.navigate(['/view-attendance-coun'])
  }

  goToReport() {
    this.router.navigate(['/view-report-coun'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
  }

  SignOut() {
    return this.auth.signOut().then(() => {
      console.log('logout success');
      this.router.navigate(['login']);
    })
  }
}
