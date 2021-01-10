import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-fac-report-coun',
  templateUrl: './view-fac-report-coun.page.html',
  styleUrls: ['./view-fac-report-coun.page.scss'],
})
export class ViewFacReportCounPage implements OnInit {

  email: string;

  month: string;
  year: string;

  coun_approve_appList = [];
  faculty_appList = [];
  faculty_attend_appList = [];
  faculty_approve_appList = [];
  faculty_unapprove_appList = [];
  faculty_absent_appList = [];

  checkForm: FormGroup;
 

  facultyList = [
    
    {
      name: 'Faculty of Industrial Sciences and Technology',
      code: 'FIST',
      value: 'FIST'
    },
    {
      name: 'Faculty of Computing',
      code: 'FCOM',
      value: 'FCOM'
    },
    {
      name: 'Faculty of Chemical and Process Engineering Technology',
      code: 'FKKSA',
      value: 'FKKSA'
    },
    {
      name: 'Faculty of Civil Engineering Technology',
      code: 'FTKA',
      value: 'FTKA'
    },
    {
      name: 'Faculty of Electrical and Electronic Engineering Technology',
      code: 'FTKEE',
      value: 'FTKEE'
    },
    {
      name: 'Faculty of Manufacturing and Mechatronic Engineering Technology',
      code: 'FKP',
      value: 'FKP'
    },
    {
      name: 'Faculty of Mechanical and Automotive Engineering Technology',
      code: 'FTKMA',
      value: 'FTKMA'
    },
    {
      name: 'Faculty of Industrial Management',
      code: 'FIM',
      value: 'FIM'
    }
  ]

  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public fb: FormBuilder,) { 

      this.checkForm = new FormGroup({
        Faculty: new FormControl(),
      });
    }

  async ngOnInit() {

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
  }

  CheckRecord(){
    console.log(this.checkForm.value.Faculty)

    var faculty = this.checkForm.value.Faculty
    
    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 1).subscribe(data => {

      this.faculty_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 0).subscribe(data => {

      this.faculty_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 0, 0).subscribe(data => {

      this.faculty_unapprove_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 2).subscribe(data => {

      this.faculty_absent_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_report_app(faculty).subscribe(data => {

      this.faculty_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    /*<div *ngFor="let row of faculty_approve_appList">
            <ion-col size="3" >{{faculty_approve_appList.length}}</ion-col>
          </div>
          <div *ngFor="let row of faculty_unapprove_appList">
            <ion-col size="3" >{{faculty_unapprove_appList.length}}</ion-col>
          </div>*/

    /*
    this.firebaseService.read_faculty_attend_app(this.email,1, 2).subscribe(data => {

      this.fcom_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
        };
      })
    });

    this.firebaseService.read_faculty_attend_app(this.email,2, 0).subscribe(data => {

      this.fcom_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
        };
      })
    });

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
    });*/
    
  }

  goBack() {
    this.router.navigate(['/view-report-coun'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
  }
}
