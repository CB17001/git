import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-student-directory',
  templateUrl: './student-directory.page.html',
  styleUrls: ['./student-directory.page.scss'],
})
export class StudentDirectoryPage implements OnInit {

  constructor(public router: Router,
    private menu: MenuController,) { }

  ngOnInit() {
  }

  goCounsellor() {
    this.router.navigate(['/stud-counsellor-info'])
  }

  goFaculty() {
    this.router.navigate(['/stud-faculty-info'])
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'user-menu');
  }

}
