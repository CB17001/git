import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private loginMenu: Array<object>
  private sideMenuList: Array<object>
  private counMenuList: Array<object>
  private facMenuList: Array<object>
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AngularFireAuth,
    private menu: MenuController
  ) {
    this.initializeApp();

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.loginMenu = [
      {
        title: 'Login',
        url: "/login"
      },
      {
        title: 'Register',
        url: "/register"
      },
    ]

    this.sideMenuList = [
      {
        title: 'Home',
        url: "/home"
      },
      {
        title: 'Account',
        url: "/student-account"
      },
      {
        title: 'Appointment',
        url: "/stud-view-appointment"
      },
      {
        title: 'Issue',
        url: "/view-issue-std"
      },
      {
        title: 'Attendance',
        url: "/view-attendance-std"
      },
    ]

    this.counMenuList = [
      {
        title: 'Home',
        url: "/counsellor-home"
      },
      {
        title: 'Account',
        url: "/counsellor-account"
      },
      {
        title: 'Appointment',
        url: "/view-appointment-counsellor"
      },
      {
        title: 'Issue',
        url: "/view-issue-counsellor"
      },
      {
        title: 'Attendance',
        url: "/view-attendance-coun"
      },
      {
        title: 'Report',
        url: "/view-report-coun"
      },
    ]

    this.facMenuList = [
      {
        title: 'Home',
        url: "/faculty-home"
      },
      {
        title: 'Account',
        url: "/faculty-account"
      },
      {
        title: 'Student Info',
        url: "/student-info"
      },
      {
        title: 'Report',
        url: "/student-info"
      },
    ]
  }

  onMenuClick(item: string) {
    console.log(item + " --> clicked")
    this.menu.close()
  }

  LogOut() {
    return this.auth.signOut().then(() => {
      console.log('logout success');
      this.router.navigate(['login']);
    })
  }

}
