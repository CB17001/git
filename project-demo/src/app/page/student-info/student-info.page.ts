import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.page.html',
  styleUrls: ['./student-info.page.scss'],
})
export class StudentInfoPage implements OnInit {

  name: any;
  faculty: string;
  studentList = [];
  facultyList = [];

  constructor(public db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    public firebaseService: FirebaseService,
    public ngFireAuth: AngularFireAuth,
    public fb: FormBuilder) { }

  async ngOnInit() {

    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);


    this.firebaseService.read_faculty_account(this.name).subscribe(data => {
  
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
    
    this.firebaseService.read_faculty_student().subscribe(data => {

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

      
      console.log(this.faculty);
    });
  }


  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
    }

}
