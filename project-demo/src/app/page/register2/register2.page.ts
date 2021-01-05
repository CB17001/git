import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

interface StudentData {
  Name: string;
  Age: number;
  Address: string;
  Email: string;
  Password: string;
}

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {

  user = {
    email: '',
    password: ''
  }

  studentList = [];
  studentData: StudentData;
  studentForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public ngFireAuth: AngularFireAuth,
    public fb: FormBuilder
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {

    this.studentForm = this.fb.group({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })

    this.firebaseService.read_students().subscribe(data => {

      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
          Email: e.payload.doc.data()['Email'],
          Password: e.payload.doc.data()['Password'],
        };
      })
      console.log(this.studentList);

    });
  }

  async CreateRecord() {
    const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);

    console.log(this.studentForm.value);
    this.firebaseService.create_student(this.studentForm.value).then(resp => {
      this.studentForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }
}
