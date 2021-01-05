import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-faculty-account',
  templateUrl: './faculty-account.page.html',
  styleUrls: ['./faculty-account.page.scss'],
})
export class FacultyAccountPage implements OnInit {

  @Input() name: string;
  data: any;
  facultyList = [];

  constructor(
    public db: AngularFirestore,
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

    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
        console.log(this.data);
  
      }
    });
    }

  async ngOnInit() {
    //check current user
    var user = await this.ngFireAuth.currentUser;
    this.name = user.email;
    console.log(this.name);
  
    //display current user profile
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
  }
  
  EditRecord(record) {
    record.isEdit = true;
    record.EditPhone = record.PhoneNum;
  }
  
  UpdateRecord(recordRow) {
    let record = {};
    record['phone'] = recordRow.EditPhone;
    this.firebaseService.update_faculty(recordRow.id, record);
    recordRow.isEdit = false;
  }
  
  ionViewWillEnter() {
    this.menu.enable(true, 'faculty-menu');
  }  

}
