import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-attendance-std',
  templateUrl: './view-attendance-std.page.html',
  styleUrls: ['./view-attendance-std.page.scss'],
})
export class ViewAttendanceStdPage implements OnInit {

  email: string;

  stud_attendance_appList = [];

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController
    ) { }

  async ngOnInit() {

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
    console.log(this.email);

    this.firebaseService.read_stud_attendance(this.email, 1, 0).subscribe(data => {

      this.stud_attendance_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      
      //var length = this.stud_attendance_appList.length;
      console.log(this.stud_attendance_appList);
    });
  }

  showConfirm(record) {

    console.log(record.Time);
    record.isEdit = true;
    record.ViewName = record.counName;
    record.ViewCounPhone = "0104636330";
    record.ViewDate = record.Date;
    record.ViewTime = record.Time;
  }

  attendButton(recordRow) {
    this.alertController.create({
      header: 'Attendance Confirmation',
      message: 'Are you attend to this appointment?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            let record = {};
            record['attendanceStatus'] = 1;
            this.firebaseService.update_student_attendance(recordRow.id, record);
            console.log(recordRow.id);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Let me think');
          }
        },
      ]
    }).then(res => {
      res.present();
    });
  }

  Back(recordRow) {
    recordRow.isEdit = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
  }

}
