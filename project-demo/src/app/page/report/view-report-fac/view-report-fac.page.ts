import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-report-fac',
  templateUrl: './view-report-fac.page.html',
  styleUrls: ['./view-report-fac.page.scss'],
})
export class ViewReportFacPage implements OnInit {

  name: any;
  facultyInfo = [];
  checkForm: FormGroup;
  fac_attend_appList = [];
  fac_approve_appList = [];
  fac_reject_appList = [];
  fac_reply_issueList = [];
  fac_notreply_issueList = [];

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public fb: FormBuilder,) { 

      this.checkForm = new FormGroup({
        faculty: new FormControl(),
      });
    }

  async ngOnInit() {

    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);

    this.firebaseService.read_faculty_account(this.name).subscribe(data => {
  
      this.facultyInfo = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Gender: e.payload.doc.data()['gender'],
          PhoneNum: e.payload.doc.data()['phone'],
          Faculty: e.payload.doc.data()['faculty'],
          Campus: e.payload.doc.data()['campus'],
        };
      })
      console.log(this.facultyInfo);
    });
  }

  submitForm() {
    console.log(this.checkForm.value)
    console.log(this.checkForm.value.faculty)
    var faculty = this.checkForm.value.faculty

    this.firebaseService.read_fac_appointment_app(faculty,1, 1).subscribe(data => {

      this.fac_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_attend_appList);
    });

    this.firebaseService.read_fac_appointment_app(faculty,1, 0).subscribe(data => {

      this.fac_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_approve_appList);
    });

    this.firebaseService.read_fac_appointment_app(faculty,0, 0).subscribe(data => {

      this.fac_reject_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_reject_appList);
    });

    this.firebaseService.read_fac_issue_app(faculty,1).subscribe(data => {

      this.fac_reply_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_reply_issueList);
    });

    this.firebaseService.read_fac_issue_app(faculty,0).subscribe(data => {

      this.fac_notreply_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_notreply_issueList);
    });
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
  }

}
