import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-attendance-coun',
  templateUrl: './view-attendance-coun.page.html',
  styleUrls: ['./view-attendance-coun.page.scss'],
})
export class ViewAttendanceCounPage implements OnInit {

  email: string;

  coun_attendance_appList = [];

  constructor(public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController) { }

  async ngOnInit() {

    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
    console.log(this.email);
    this.firebaseService.read_coun_attendance(this.email, 1, 0).subscribe(data => {

      this.coun_attendance_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Studentemail: e.payload.doc.data()['studentemail'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.coun_attendance_appList);

      
      
      console.log(this.coun_attendance_appList.length);
    });
  }

  showConfirm(record) {

    console.log(record.Time);
    record.isEdit = true;
    record.ViewName = record.Studentemail;
    //record.ViewCounPhone = "0104636330";
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
            this.firebaseService.update_coun_attendance(recordRow.id, record);
            console.log(recordRow.id);
          }
        },
        {
          text: 'No',
          handler: () => {
            let record = {};
            record['attendanceStatus'] = 2;
            this.firebaseService.update_coun_attendance(recordRow.id, record);
            console.log(recordRow.id);
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
    this.menu.enable(true, 'counsellor-menu');
  }
}
