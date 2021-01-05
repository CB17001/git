import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment-counsellor',
  templateUrl: './view-appointment-counsellor.page.html',
  styleUrls: ['./view-appointment-counsellor.page.scss'],
})
export class ViewAppointmentCounsellorPage implements OnInit {

  email: string;

  coun_approve_appList = [];
  coun_not_approve_appList = [];
  coun_attend_appList = [];

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController) { }

  async ngOnInit() {

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
    console.log(this.email);

    this.firebaseService.read_coun_approve_app(this.email,1,0).subscribe(data => {

      this.coun_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.coun_approve_appList);
    });

    this.firebaseService.read_coun_not_approve_app(this.email, 0, 0).subscribe(data => {

      this.coun_not_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.coun_not_approve_appList);
    });

    this.firebaseService.read_coun_attend_app(this.email,1, 1).subscribe(data => {

      this.coun_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.coun_attend_appList);
    });
  
  }

  ApproveAppointment() {
    this.router.navigate(['/approve-appointment-counsellor'])
  }

  CreateAppointment() {
    this.router.navigate(['/create-appointment-counsellor'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
    }
}
