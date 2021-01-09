import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-issue-std',
  templateUrl: './create-issue-std.page.html',
  styleUrls: ['./create-issue-std.page.scss'],
})
export class CreateIssueStdPage implements OnInit {

  private counsellorList: Array<object>
  studentInfo = [];

  issueStudForm: FormGroup;

  selectedVal: string;

  counsellorName: string;
  message: string;
  faculty: string;
  reply: string;
  issueStatus: number;
  currentdate = Date.now();

  studentemail: string;

  constructor(public fb: FormBuilder,
    public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController) { }

  async ngOnInit() {
    this.issueStudForm = this.fb.group({
      counsellorname: ['', [Validators.required]],
      message: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
    });

    var user = await this.ngFireAuth.currentUser;
    this.studentemail = user.email;
    console.log(this.studentemail);

    this.firebaseService.read_counsellor().subscribe(data => {

      this.counsellorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['email'],
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.counsellorList);
    });

    this.firebaseService.read_student(this.studentemail).subscribe(data => {

      this.studentInfo = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Faculty: e.payload.doc.data()['faculty'],
          Campus: e.payload.doc.data()['campus'],
        };
      })
      console.log(this.studentInfo);
      
    });

  }

  async CreateIssue() {

    this.issueStatus = 0;

    console.log(this.selectedVal);
    console.log(this.studentemail);
    console.log(this.message);
    console.log(this.issueStatus);
    console.log(this.issueStudForm.value.faculty);
    

    this.db.collection("Database")
                .doc("issue")
                .collection("Issue")
                .add({
      counsellorname: this.selectedVal,
      studentemail: this.studentemail,
      message: this.message,
      date: this.currentdate,
      issueStatus: this.issueStatus,
      faculty: this.issueStudForm.value.faculty,
      reply: ""
    })
    

    const toast = await this.toastController.create({
      message: 'Issue Created Successfully',
      duration: 1500
    });
    toast.present();
    this.router.navigate(['view-issue-std']);
  }

  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }
}
