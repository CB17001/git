import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.page.html',
  styleUrls: ['./student-info.page.scss'],
})
export class StudentInfoPage implements OnInit {

  name: any;
  studentList = [];
  facultyInfo = [];
  ionicForm: FormGroup;
  checkForm: FormGroup;

  user = {
    name: '',
    email: '',
    password: '',
  }

  faculty = {
    faculty: '',
    password: '',
  }

  FacultyList = [
    
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
  ];

  status = [
    {
      name: 'Normal Student',
      EditStatus: 'Normal Student',
    },
    {
      name: 'P1/P2 Student',
      EditStatus: 'P1/P2 Student',
    },
  ]

  constructor(public db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    public firebaseService: FirebaseService,
    public ngFireAuth: AngularFireAuth,
    public fb: FormBuilder) 
    { 

      this.ionicForm = new FormGroup({
        name: new FormControl(),
        faculty: new FormControl(),
      });
  
      this.checkForm = new FormGroup({
        faculty: new FormControl(),
      });
    }

  async ngOnInit() {

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
    /*this.testForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    })

    this.facultyForm = this.fb.group({
      Faculty: ['', [Validators.required]],
      Name: ['', [Validators.required]],
    })


    /*this.firebaseService.read_faculty_account(this.name).subscribe(data => {
  
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
    });*/
    
    
  }

  submitForm() {
    console.log(this.checkForm.value.faculty)


    this.firebaseService.read_faculty_student(this.checkForm.value.faculty).subscribe(data => {

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
    record.ViewMatricID = record.MatricID;
    record.ViewGender = record.Gender;
    record.ViewPhoneNum = record.PhoneNum;
    record.EditStatus = record.Status;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['status'] = recordRow.EditStatus;
    console.log(recordRow.EditStatus);
    this.firebaseService.update_status(recordRow.id, record);
    recordRow.isEdit = false;
  }

  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

  Back(recordRow) {
    recordRow.isEdit = false;
  }
  
  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
    }

}
