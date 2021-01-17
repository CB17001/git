import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-stud-faculty-info',
  templateUrl: './stud-faculty-info.page.html',
  styleUrls: ['./stud-faculty-info.page.scss'],
})
export class StudFacultyInfoPage implements OnInit {

  facultyList = []
  staffList = []
  name:String

  checkForm: FormGroup;

  constructor(public db: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public fb: FormBuilder,) 
    { 

      this.checkForm = new FormGroup({
        faculty: new FormControl(),
      });
    }

  async ngOnInit() {
    
    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);

    this.firebaseService.read_student(this.name).subscribe(data => {

      this.staffList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          MatricID: e.payload.doc.data()['matric'],
          Gender: e.payload.doc.data()['gender'],
          Faculty: e.payload.doc.data()['faculty'],
          Campus: e.payload.doc.data()['campus'],
          PhoneNum: e.payload.doc.data()['phone'],
          Status: e.payload.doc.data()['status'],
        };
      })
      console.log(this.staffList);
    });

  }

  submitForm() {
    console.log(this.checkForm.value.faculty)


    this.firebaseService.read_faculty_staff(this.checkForm.value.faculty).subscribe(data => {

      this.facultyList = data.map(e => {
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
      console.log(this.facultyList);
    });
  }

  showConfirm(record) {

    record.isEdit = true;
    record.ViewName = record.Name;
    record.ViewEmail = record.Email;
    record.ViewPhoneNum = record.PhoneNum;
    record.ViewGender = record.Gender;
    record.ViewFaculty = record.Faculty;
    record.ViewCampus = record.Campus;
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
