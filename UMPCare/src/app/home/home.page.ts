import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface StudentData {
  stud_email: string;
  stud_name: string;
  stud_pass: string;
  stud_pnum: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  studentList = [];
  studentData: StudentData;
  studentForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {

    this.studentForm = this.fb.group({
      stud_email: ['', [Validators.required]],
      stud_name: ['', [Validators.required]],
      stud_pass: ['', [Validators.required]],
      stud_pnum: ['', [Validators.required]]
    })

    this.firebaseService.read_students().subscribe(data => {

      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          stud_email: e.payload.doc.data()['stud_email'],
          stud_name: e.payload.doc.data()['stud_name'],
          stud_pass: e.payload.doc.data()['stud_pass'],
          stud_pnum: e.payload.doc.data()['stud_pnum'],
        };
      })
      console.log(this.studentList);

    });
  }

  CreateRecord() {
    console.log(this.studentForm.value);
    this.firebaseService.create_student(this.studentForm.value).then(resp => {
      this.studentForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_student(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditEmail = record.stud_email;
    record.EditName = record.stud_name;
    record.EditPassword = record.stud_pass;
    record.EditPNum = record.stud_pnum;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['stud_email'] = recordRow.EditEmail;
    record['stud_name'] = recordRow.EditName;
    record['stud_pass'] = recordRow.EditPassword;
    record['stud_pnum'] = recordRow.EditPNum;
    this.firebaseService.update_student(recordRow.id, record);
    recordRow.isEdit = false;
  }

}