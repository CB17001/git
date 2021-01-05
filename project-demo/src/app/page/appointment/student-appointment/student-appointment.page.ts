import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, ToastController } from '@ionic/angular';
import { Time } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-student-appointment',
  templateUrl: './student-appointment.page.html',
  styleUrls: ['./student-appointment.page.scss'],
})
export class StudentAppointmentPage implements OnInit {

  private counsellorList: Array<object>

  student = {
    name: '',
    matric: '',
    Faculty: '',
    gender: '',
    phone: '',
    campus: '',
  }

  selectedVal: string;
  SelectTime: string;

  attendanceStatus: number;
  approveStatus: number;

  appointStudForm: FormGroup;
  //studentR: StudentRegister;
  studentemail: string;
  counsellorname: string;
  date: Date;

  appointmentList = [];
  studentList = [];

  SelectDate = new Date().toDateString();
  
  constructor(public fb: FormBuilder,
      public db: AngularFirestore,
      public toastController: ToastController,
      public ngFireAuth: AngularFireAuth,
      public firebaseService: FirebaseService,
      public router: Router,
      private menu: MenuController) {

        /*
        this.counsellorList = [
          {
            id: "admin",
            name: "Admin"
          },
          {
            id: "umar",
            name: "Umar"
          },
        ]*/

      }

  async ngOnInit() {

    this.appointStudForm = this.fb.group({
      counsellorname: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      faculty: ['', []],
    });

    var user = await this.ngFireAuth.currentUser;
    this.studentemail = user.email;
    console.log(this.studentemail);

    this.firebaseService.read_student(this.studentemail).subscribe(data => {

      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Faculty: e.payload.doc.data()['faculty'],
          Campus: e.payload.doc.data()['campus'],
        };
      })
      console.log(this.studentList);
      
    });

    this.firebaseService.read_counsellor().subscribe(data => {

      this.counsellorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['email'],
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.counsellorList);
    });

    this.firebaseService.read_appointment().subscribe(data => {

      this.appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.appointmentList);
    });
  }

  dateChanged(date) {
    console.log(this.SelectDate);
  }


  timeChanged(time) {
    console.log(this.SelectTime);
  }


  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

  async CreateAppointment() {

    this.attendanceStatus = 0;
    this.approveStatus = 0;
    var faculty = this.appointStudForm.value.faculty;
console.log(faculty)
    this.db.collection("Database")
                .doc("appointment")
                .collection("Appointment")
                .add({
      counsellorname: this.selectedVal,
      studentemail: this.studentemail,
      date: this.SelectDate,
      time: this.SelectTime,
      attendanceStatus: this.attendanceStatus,
      approveStatus: this.approveStatus,
      faculty: faculty,
    })
    

    const toast = await this.toastController.create({
      message: 'Appointment Created Successfully',
      duration: 1500
    });
    toast.present();
    this.router.navigate(['stud-view-appointment']);
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }

}
