import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.page.html',
  styleUrls: ['./student-account.page.scss'],
})
export class StudentAccountPage implements OnInit {

  @Input() name: string;
  data: any;
  studentList = [];

  constructor(public db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    public firebaseService: FirebaseService,
    public ngFireAuth: AngularFireAuth) {

      var user = ngFireAuth.currentUser;
      var email;
      
      ngFireAuth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user.email);
      }
    });

      //method 3: state (simon youtube)
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
        console.log(this.data);

        /*
        this.firebaseService.read_user(this.data.email).subscribe(data => {

          this.studentList = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              Name: e.payload.doc.data()['name'],
              Age: e.payload.doc.data()['age'],
              Address: e.payload.doc.data()['address'],
              Email: e.payload.doc.data()['email'],
            };
          })
          console.log(this.studentList);
        });*/
      }
    });
   }

  async ngOnInit() {

    //check current user
    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);

    //display current user profile
    this.firebaseService.read_student(this.name).subscribe(data => {

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

  EditRecord(record) {
    record.isEdit = true;
    record.EditPhone = record.PhoneNum;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['phone'] = recordRow.EditPhone;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }
}
