import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-counsellor-account',
  templateUrl: './counsellor-account.page.html',
  styleUrls: ['./counsellor-account.page.scss'],
})
export class CounsellorAccountPage implements OnInit {

  @Input() name: string;
  counsellorList = [];
  data: any;
  

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
    this.firebaseService.read_counsellor_account(this.name).subscribe(data => {

      this.counsellorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Gender: e.payload.doc.data()['gender'],
          PhoneNum: e.payload.doc.data()['phone'],
          Room: e.payload.doc.data()['room'],
        };
      })
      console.log(this.counsellorList);
    });
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditPhone = record.PhoneNum;
    record.EditRoom = record.Room;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['phone'] = recordRow.EditPhone;
    record['room'] = recordRow.EditRoom;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'counsellor-menu');
    }

}
