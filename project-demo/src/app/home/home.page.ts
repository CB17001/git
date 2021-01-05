import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user/user.interface';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { StudentAccountPage } from '../page/account/student-account/student-account.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';


interface StudentData {
  Name: string;
  Age: number;
  Address: string;
  Email: string;
  Password: string;
}

interface userData {
  email: string;
  uid: string;
}

interface StudentUser {
  email: string;
    password: string;
    name: string;
    age: string;
    address: string;
    uid: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any;
  private email;

  /*
  user = {
    email: '',
    password: '',
    name: '',
    age: '',
    address: '',
    uid: '',
  }
  */

  studentList = [];
  counsellorList = [];
  studentData: StudentData;
  studUser: StudentUser;
  studentForm: FormGroup;
  user: userData;

  counsellorRef: any;
  counsellorCheck: any;


  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public navCtrl: NavController,
    public auth: AngularFireAuth,
    public db: AngularFirestore,
    private menu: MenuController 
  ) {
    this.studentData = {} as StudentData;

    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user.email);
      }
    });
  }

  async ngOnInit() {

    var user = await this.auth.currentUser;
    this.email = user.email;
    console.log(this.email);

    //Check whether counsellor account exist or not
    this.db.doc('Database/user/User/counsellor/Counsellor/' + this.email).ref.get().then((documentSnapshot) => {
      console.log(documentSnapshot.exists);

      //If exist redirect to counsellor page
      if(documentSnapshot.exists == true)
      {
        this.router.navigate(['/counsellor-home'])
      }

      else
      {
        //Check whether faculty account exist or not
        this.db.doc('Database/user/User/faculty/Faculty/' + this.email).ref.get().then((documentSnapshot) => {
          console.log(documentSnapshot.exists);
    
          //If exist redirect to faculty page
          if(documentSnapshot.exists == true)
          {
            this.router.navigate(['/faculty-home'])
          }
    
          
        });
      }
      
    });

  }

  goToAccount() {
    this.router.navigate(['/student-account'])
  }

  goToAppointment() {
    this.router.navigate(['/stud-view-appointment'])
  }

  goToIssue() {
    this.router.navigate(['/view-issue-std'])
  }

  goToAttendance() {
    this.router.navigate(['/view-attendance-std'])
  }

  SignOut() {
    return this.auth.signOut().then(() => {
      console.log('logout success');
      this.router.navigate(['login']);
    })
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }

  _openSideNav() {
    this.menu.enable(true, 'menu-content')
    this.menu.open('menu-content')
  }

}