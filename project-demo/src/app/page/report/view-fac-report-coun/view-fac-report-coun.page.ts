import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view-fac-report-coun',
  templateUrl: './view-fac-report-coun.page.html',
  styleUrls: ['./view-fac-report-coun.page.scss'],
})
export class ViewFacReportCounPage implements OnInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  doughnutChart: any;

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
      code: 'FK',
      value: 'FK'
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
  }

  CheckRecord(){
    console.log(this.checkForm.value.Faculty)

    var faculty = this.checkForm.value.Faculty
    
    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 1).subscribe(data => {

      this.faculty_attend_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 0).subscribe(data => {

      this.faculty_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 0, 0).subscribe(data => {

      this.faculty_unapprove_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
          faculty: e.payload.doc.data()['faculty'],
        };
      })
    });

    this.firebaseService.read_faculty_appointment_app(this.email, faculty, 1, 2).subscribe(data => {

      this.faculty_absent_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
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

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
      type: 'doughnut',
      data: {
        labels: ['Attend', 'Approved', 'Unapproved', 'Absent'],
        datasets: [{
          label: '# of Appointments',
          data: [2, 1, 1, 0],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            //'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            //'#FF6384'
          ]
        }]
      }
    });
  }

  goBack() {
    this.router.navigate(['/view-report-coun'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
  }
}
