import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-coun-student-info',
  templateUrl: './coun-student-info.page.html',
  styleUrls: ['./coun-student-info.page.scss'],
})
export class CounStudentInfoPage implements OnInit {

  studentList = []
  name:String
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

  constructor(public db: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public fb: FormBuilder,) 
    { 

      this.checkForm = new FormGroup({
        Faculty: new FormControl(),
      });
    }

  async ngOnInit() {
    
    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);

  }

  CheckRecord() {
    console.log(this.checkForm.value.Faculty)


    this.firebaseService.read_faculty_student(this.checkForm.value.Faculty).subscribe(data => {

      this.studentList = data.map(e => {
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
      console.log(this.studentList);
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
    this.menu.enable(true, 'counsellor-menu');
  }

  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

}
