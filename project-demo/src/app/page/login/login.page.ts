import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, MenuController, AlertController } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../user.service'

 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../models/user/user.interface';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from 'src/app/home/home.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { loggedIn } from '@angular/fire/auth-guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: '',
    role: ''
  }

  userData = {
    //name: email
  }

  private email;
  private password;

  error = '';
  loginForm: FormGroup;

  value_selected:string = "student";
  public Student;

  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;

  radio_list = [
    {
      role: 'Student',
      name: 'user-role',
      value: 'student',
      checked: true
    },
    {
      role: 'Counsellor',
      name: 'user-role',
      value: 'counsellor',
      checked: false
    },
    {
      role: 'Faculty',
      name: 'user-role',
      value: 'faculty',
      checked: false
    }
  ];

  radioSelect(event) {
    console.log("radioSelect ", event.detail);
    this.selectedRadioItem = event.detail;
    console.log(this.selectedRadioItem);
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }

  constructor(private router: Router,
    private menu: MenuController,
    public ngFireAuth: AngularFireAuth, 
    public toastController: ToastController,
    public userS: UserService,
    public db: AngularFirestore,
    public firebaseService: FirebaseService,
    private dataService: DataService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public fb: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Role: ['', [Validators.required]]
    })
  }

  getStudent(): AngularFirestoreCollection<User> {
    return this.db.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student");
  }

  
  async login() {

    const user = await this.ngFireAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(async res=> {
      if (this.ngFireAuth.currentUser !== null) {
        var email = this.user.email;
        console.log(email);

        
        if(this.user.role == "student") {
          this.db.doc('Database/user/User/student/Student/' + this.user.email).ref.get().then(async (documentSnapshot) => {
            console.log(documentSnapshot.exists);

            //If exist redirect to student page
            if(documentSnapshot.exists == true)
            {
              this.router.navigate(['/home'])
            }
            else {
              this.failLogin()
            }
          });
        }

        else if(this.user.role == "counsellor") {
          this.db.doc('Database/user/User/counsellor/Counsellor/' + this.user.email).ref.get().then(async (documentSnapshot) => {
            console.log(documentSnapshot.exists);
      
            //If exist redirect to counsellor page
            if(documentSnapshot.exists == true)
            {
              this.router.navigate(['/counsellor-home'])
            }
            else {
              this.failLogin()
            }
          });
        }

        else if(this.user.role == "faculty") {
          console.log(this.user.email);
          this.db.doc('Database/user/User/faculty/Faculty/' + this.user.email).ref.get().then((documentSnapshot) => {
            console.log(documentSnapshot.exists);
      
            //If exist redirect to faculty page
            if(documentSnapshot.exists == true)
            {
              this.router.navigate(['/faculty-home'])
            }
            else {
              this.failLogin()
            }
          });
        }
      }
    })
    .catch(err => {
      console.log(`login failed ${err}`);
      this.error = err.message;
      this.failLogin()
    } )
    this.loginForm.reset();
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'login-menu');
    }

  failLogin() {
    this.alertController.create({
      header: 'Login Failed',
      message: 'Wrong Information or Not Exist',
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        },
      ]
    }).then(res => {
      res.present();
    });
  }
}
