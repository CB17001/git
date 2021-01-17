import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-report-coun',
  templateUrl: './view-report-coun.page.html',
  styleUrls: ['./view-report-coun.page.scss'],
})
export class ViewReportCounPage implements OnInit {

  email: string;

  coun_approve_appList = [];
  coun_not_approve_appList = [];
  coun_attend_appList = [];

  coun_replied_issueList = [];
  coun_unreplied_issueList = [];

  checkForm: FormGroup;

  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;

  monthList = [
    
    {
      name: 'January',
      value: '1'
    },
    {
      name: 'February',
      value: '2'
    },
    {
      name: 'March',
      value: '3'
    },
    {
      name: 'April',
      value: '4'
    },
    {
      name: 'May',
      value: '5'
    },
    {
      name: 'June',
      value: '6'
    },
    {
      name: 'July',
      value: '7'
    },
    {
      name: 'August',
      value: '8'
    },
    {
      name: 'September',
      value: '9'
    },
    {
      name: 'October',
      value: '10'
    },
    {
      name: 'November',
      value: '11'
    },
    {
      name: 'December',
      value: '12'
    },
  ]

  yearList = [
    {
      name: '2020',
      value: '2020'
    },
    {
      name: '2021',
      value: '2021'
    },
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
    public fb: FormBuilder,) { }

  async ngOnInit() {
    this.checkForm = this.fb.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    })

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
  }
  
  CheckRecord(){
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

    this.firebaseService.read_replied_coun_issue(this.email,0).subscribe(data => {

      this.coun_replied_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
          Reply: e.payload.doc.data()['reply'],
        };
      })
      console.log(this.coun_replied_issueList);
    });

    this.firebaseService.read_replied_coun_issue(this.email,0).subscribe(data => {

      this.coun_unreplied_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
          Reply: e.payload.doc.data()['reply'],
        };
      })
      console.log(this.coun_unreplied_issueList);
    });
    
  }

  CheckFaculty(){
    this.router.navigate(['/view-fac-report-coun'])
  }

  gotoAppointment() {
    this.router.navigate(['/view-appointment-counsellor'])
  }

  gotoIssue() {
    this.router.navigate(['/view-issue-counsellor'])
  }
  
  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
  }

}
