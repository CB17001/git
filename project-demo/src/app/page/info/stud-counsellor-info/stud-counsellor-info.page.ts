import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-stud-counsellor-info',
  templateUrl: './stud-counsellor-info.page.html',
  styleUrls: ['./stud-counsellor-info.page.scss'],
})
export class StudCounsellorInfoPage implements OnInit {

  counsellorList=[]

  constructor(public db: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public fb: FormBuilder,) { }

  ngOnInit() {
    this.firebaseService.read_counsellor().subscribe(data => {

      this.counsellorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Gender: e.payload.doc.data()['gender'],
          PhoneNum: e.payload.doc.data()['phone'],
          Room: e.payload.doc.data()['room'],
        };
      })
    });
  }

  showConfirm(record) {

    record.isEdit = true;
    record.ViewName = record.Name;
    record.ViewEmail = record.Email;
    record.ViewPhoneNum = record.PhoneNum;
    record.ViewGender = record.Gender;
    record.ViewRoom = record.Room;
  }
  
  Back(recordRow) {
    recordRow.isEdit = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
  }

  goBack() {
    this.router.navigate(['/student-directory'])
  }
}
