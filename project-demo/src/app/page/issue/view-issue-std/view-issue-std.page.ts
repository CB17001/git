import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-view-issue-std',
  templateUrl: './view-issue-std.page.html',
  styleUrls: ['./view-issue-std.page.scss'],
})
export class ViewIssueStdPage implements OnInit {

  studentemail: string;
  email: string;
  
  checked_issueList = [];
  unchecked_issueList = [];

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
    this.studentemail = user.email;
    this.email = user.email;
    console.log(this.studentemail);

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

    this.firebaseService.read_checked_issue(user.email,1).subscribe(data => {

      this.checked_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
        };
      })
      console.log(this.checked_issueList);
    });

    this.firebaseService.read_unchecked_issue(user.email,0).subscribe(data => {

      this.unchecked_issueList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['studentemail'],
          counName: e.payload.doc.data()['counsellorname'],
          Date: e.payload.doc.data()['date'],
          Message: e.payload.doc.data()['message'],
        };
      })
      console.log(this.unchecked_issueList);
    });
  }

  CreateIssue() {
    this.router.navigate(['/create-issue-std'])
  }

  showConfirm(record) {

    record.isEdit = true;
    record.ViewName = record.counName;
    record.ViewDate = record.Date;
    record.ViewMessage = record.Message;
  }

  Back(recordRow) {
    recordRow.isEdit = false;
  }

  /*showConfirm(recordRow) {
    this.alertController.create({
      header: 'Approval Confirmation',
      message: 'Are you sure to approve this appointment?',
      inputs: [
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        }
        
      ],
      
      buttons: [
        {
          text: 'Approve',
          handler: (paragraph) => {
            let record = {};
            record['approveStatus'] = 1;
            this.firebaseService.update_approve_appointment(recordRow.id, record);
            console.log(paragraph);
          }
        },
        {
          text: 'Reject',
          handler: () => {
            let record = {};
            record['approveStatus'] = 2;
            this.firebaseService.update_approve_appointment(recordRow.id, record);
            console.log('Let me think');
          }
        },
      ]
    }).then(res => {
      res.present();
    });
  }*/

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
    }

}
