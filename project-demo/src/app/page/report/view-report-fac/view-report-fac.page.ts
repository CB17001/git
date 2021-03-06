import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view-report-fac',
  templateUrl: './view-report-fac.page.html',
  styleUrls: ['./view-report-fac.page.scss'],
})
export class ViewReportFacPage implements OnInit {

  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('doughnutCanvas2') private doughnutCanvas2: ElementRef;
  doughnutChart: any;

  name: any;
  facultyInfo = [];
  checkForm: FormGroup;
  fac_attend_appList = [];
  fac_approve_appList = [];
  fac_notapproved_appList = [];
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

      this.fac_notapproved_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.fac_notapproved_appList);
    });

    this.firebaseService.read_fac_issue_app(faculty,1).subscribe(data => {

      this.fac_reply_issueList = data.map(e => {
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
          Message: e.payload.doc.data()['message'],
          Reply: e.payload.doc.data()['reply'],
        };
      })
      console.log(this.fac_notreply_issueList);
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
      type: 'doughnut',
      data: {
        labels: ['Attended', 'Approved', 'Rejected'],
        datasets: [{
          label: '# of Appoointments',
          data: [3, 1, 3],
          backgroundColor: [
            //'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            //'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            //'#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            //'#FF6384'
          ]
        }]
      }
    });

    this.doughnutChart = new Chart(this.doughnutCanvas2.nativeElement, {
      
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Incomplete'],
        datasets: [{
          label: '# of Issues',
          data: [5, 4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
          ]
        }]
      }
    });
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
  }

  showConfirm(record) {

    record.isEdit = true;
    record.ViewName = record.Email;
    record.ViewCoun = record.counName;
    record.ViewDate = record.Date;
    record.ViewMessage = record.Message;
    record.EditReply = record.Reply;
  }

  Back(recordRow) {
    recordRow.isEdit = false;
  }

}
