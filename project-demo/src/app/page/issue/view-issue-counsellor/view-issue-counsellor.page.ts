import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-issue-counsellor',
  templateUrl: './view-issue-counsellor.page.html',
  styleUrls: ['./view-issue-counsellor.page.scss'],
})
export class ViewIssueCounsellorPage implements OnInit {

  email: string;
  
  unreplied_coun_issueList = [];
  replied_coun_issueList = [];

  constructor(public fb: FormBuilder,
    public db: AngularFirestore,
    public toastController: ToastController,
    public ngFireAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    public router: Router,
    private menu: MenuController,
    public alertController: AlertController) { }

  async ngOnInit() {
    var user = await this.ngFireAuth.currentUser;
    this.email = user.email;
    console.log(this.email);

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    this.firebaseService.read_unreplied_coun_issue(user.email,0).subscribe(data => {

      this.unreplied_coun_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
          Reply: e.payload.doc.data()['reply'],
        };
      })
      console.log(this.unreplied_coun_issueList);
    });

    this.firebaseService.read_replied_coun_issue(user.email,1).subscribe(data => {

      this.replied_coun_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
          Reply: e.payload.doc.data()['reply'],
        };
      })
      console.log(this.replied_coun_issueList);
    });
  }

  showConfirm(record) {

    record.isEdit = true;
    record.ViewName = record.Email;
    record.ViewDate = record.Date;
    record.ViewMessage = record.Message;
    record.EditReply = record.Reply;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['reply'] = recordRow.EditReply;
    record['issueStatus'] = 1;
    this.firebaseService.reply_issue(recordRow.id, record);
    recordRow.isEdit = false;
  }

  Back(recordRow) {
    recordRow.isEdit = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
    }
}
