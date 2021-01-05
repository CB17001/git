import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-issue-std',
  templateUrl: './view-issue-std.page.html',
  styleUrls: ['./view-issue-std.page.scss'],
})
export class ViewIssueStdPage implements OnInit {

  studentemail: string;
  
  issueList = [];

  constructor(public fb: FormBuilder,
    public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController) { }

  async ngOnInit() {
    var user = await this.ngFireAuth.currentUser;
    this.studentemail = user.email;
    console.log(this.studentemail);

    this.firebaseService.read_issue(user.email).subscribe(data => {

      this.issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
        };
      })
      console.log(this.issueList);
    });
  }

  CreateIssue() {
    this.router.navigate(['/create-issue-std'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }

}
