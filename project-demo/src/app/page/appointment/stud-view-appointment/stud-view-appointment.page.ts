import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stud-view-appointment',
  templateUrl: './stud-view-appointment.page.html',
  styleUrls: ['./stud-view-appointment.page.scss'],
})
export class StudViewAppointmentPage implements OnInit {

  //studentR: StudentRegister;
  studentemail: string;
  email: string;
  
  counsellorname: string;
  date: Date;

  appointmentList = [];
  not_approve_appList = [];
  approve_appList = [];
  attendance_appList = [];

  SelectDate = new Date().toDateString();
  
  constructor(public db: AngularFirestore,
      public toastController: ToastController,
      public ngFireAuth: AngularFireAuth,
      public firebaseService: FirebaseService,
      public router: Router,
      private menu: MenuController) {
      }

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
    this.studentemail = user.email;
    console.log(this.studentemail);


    this.firebaseService.read_approve_app(this.studentemail,1,0).subscribe(data => {

      this.approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.approve_appList);
    });

    this.firebaseService.read_not_approve_app(this.studentemail,0,0).subscribe(data => {

      this.not_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.not_approve_appList);
    });


    this.firebaseService.read_attend_app(this.studentemail,1,1).subscribe(data => {

      this.attendance_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.not_approve_appList);
    });
  }

  CreateAppointment() {
    this.router.navigate(['/student-appointment'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }

}
