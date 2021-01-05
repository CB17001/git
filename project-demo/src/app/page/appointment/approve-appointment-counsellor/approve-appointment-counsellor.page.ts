import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-appointment-counsellor',
  templateUrl: './approve-appointment-counsellor.page.html',
  styleUrls: ['./approve-appointment-counsellor.page.scss'],
})
export class ApproveAppointmentCounsellorPage implements OnInit {

  email: string;

  coun_not_approve_appList = [];

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

    this.firebaseService.read_coun_not_approve_app(this.email, 0, 0).subscribe(data => {

      this.coun_not_approve_appList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Time: e.payload.doc.data()['time'],
        };
      })
      console.log(this.coun_not_approve_appList);
    });
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['phone'] = recordRow.EditPhone;
    record['room'] = recordRow.EditRoom;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  showConfirm(recordRow) {
    this.alertController.create({
      header: 'Approval Confirmation',
      message: 'Are you sure to approve this appointment?',
      buttons: [
        {
          text: 'Approve',
          handler: () => {
            let record = {};
            record['approveStatus'] = 1;
            this.firebaseService.update_approve_appointment(recordRow.id, record);
            console.log('I care about humanity');
          }
        },
        {
          text: 'Reject',
          handler: () => {
            let record = {};
            record['approveStatus'] = 2;
            this.firebaseService.update_approve_appointment(recordRow.id, record);
            console.log('Let me think');
          }
        },
      ]
    }).then(res => {
      res.present();
    });
  }

  goBack() {
    this.router.navigate(['/view-appointment-counsellor'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
    }

}
