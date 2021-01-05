import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-appointment-counsellor',
  templateUrl: './create-appointment-counsellor.page.html',
  styleUrls: ['./create-appointment-counsellor.page.scss'],
})
export class CreateAppointmentCounsellorPage implements OnInit {

  private studentList: Array<object>
  private studentList2: Array<object>

  selectedVal: string;
  SelectTime: string;

  attendanceStatus: number;
  approveStatus: number;
  faculty: string;

  appointmentCounForm: FormGroup;
  email: string;
  counsellorname: string;
  date: Date;

  appointmentList = [];

  SelectDate = new Date().toDateString();

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    public fb: FormBuilder,
    private menu: MenuController) { }

  async ngOnInit() {

    this.appointmentCounForm = this.fb.group({
      studentname: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      faculty: ['', []],
    });

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
    console.log(this.email);

    this.firebaseService.read_p1p2stud().subscribe(data => {

      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['email'],
          name: e.payload.doc.data()['name'],
          faculty: e.payload.doc.data()['faculty'],
        };
      })
      console.log(this.studentList);
    });

  }

  async CreateAppointment() {
    console.log(this.selectedVal)
    console.log(this.appointmentCounForm.value)

    this.attendanceStatus = 0;
    this.approveStatus = 0;
    this.faculty = "";
    this.db.collection("Database")
                .doc("appointment")
                .collection("Appointment")
                .add({
      counsellorname: this.email,
      studentemail: this.selectedVal,
      date: this.SelectDate,
      time: this.SelectTime,
      attendanceStatus: this.attendanceStatus,
      approveStatus: this.approveStatus,
      faculty: this.faculty,
    })
    

    const toast = await this.toastController.create({
      message: 'Appointment Created Successfully',
      duration: 1500
    });
    toast.present();
    //this.router.navigate(['stud-view-appointment']);
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

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
    }

}
