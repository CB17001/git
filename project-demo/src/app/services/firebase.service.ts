import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Students';
  collectionUser = 'User';

  constructor(private firestore: AngularFirestore) { }

  create_student(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  create_user(record) {
    return this.firestore.collection(this.collectionUser).add(record);
  }

  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  read_student(email) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student", 
    ref=> ref
    .where("email", "==", email)
    ).snapshotChanges();
  }

  update_student(recordID, record) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student")
    .doc(recordID).update(record);
  }

  read_counsellor_account(email) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("counsellor")
    .collection("Counsellor", 
    ref=> ref
    .where("email", "==", email)
    ).snapshotChanges();
  }

  update_counsellor(recordID, record) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("counsellor")
    .collection("Counsellor")
    .doc(recordID).update(record);
    //this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  //Faculty Account
  read_faculty_account(email) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("faculty")
    .collection("Faculty", 
    ref=> ref
    .where("email", "==", email)
    ).snapshotChanges();
  }

  update_faculty(recordID, record) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("faculty")
    .collection("Faculty")
    .doc(recordID).update(record);
  }


  read_approve_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("studentemail", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  read_not_approve_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("studentemail", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  read_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("studentemail", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }


  //Counsellor Approved Appointment
  read_coun_approve_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  //Counsellor Not Approved Appointment
  read_coun_not_approve_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  //Counsellor Attended Appointment
  read_coun_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  //Counsellor Approve Appointment
  update_approve_appointment(recordID, record) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment")
    .doc(recordID).update(record);
  }

  read_appointment() {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment")
    .snapshotChanges();
  }

  read_counsellor() {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("counsellor")
    .collection("Counsellor") 
    .snapshotChanges();
  }

  read_p1p2stud() {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student", 
    ref=> ref
    .where("status", "==", "Normal")
    ).snapshotChanges();
  }

  read_p1p2fac(email) {
    return this.firestore.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student", 
    ref=> ref
    .where("email", "==", email)
    ).snapshotChanges();
  }

  read_issue(email) {
    return this.firestore.collection("Database")
    .doc("issue")
    .collection("Issue", 
    ref=> ref
    .where("studentemail", "==", email)
    ).snapshotChanges();
  }

  //
  // Attendance
  //

  read_stud_attendance(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("studentemail", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  update_student_attendance(recordID, record) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment")
    .doc(recordID).update(record);
  }

  read_coun_attendance(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    ).snapshotChanges();
  }

  update_coun_attendance(recordID, record) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment")
    .doc(recordID).update(record);
  }

  report(){}

  //date
  read_fcom_attend_app(email, approve, attend, month, year) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    //.where("date", ">=", year+"-"+month+"01T00:00:00+08:00")
    //.where("date", "<=", year+"-"+month+"31T00:00:00+08:00")
    .where("faculty", "==", "FCOM")
    ).snapshotChanges();
  }

  read_fist_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FIST")
    ).snapshotChanges();
  }

  read_fkksa_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FKKSA")
    ).snapshotChanges();
  }

  read_ftka_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FTKA")
    ).snapshotChanges();
  }

  read_ftkee_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FTKEE")
    ).snapshotChanges();
  }

  read_fkp_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FKP")
    ).snapshotChanges();
  }

  read_ftkma_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FTKMA")
    ).snapshotChanges();
  }

  read_fim_attend_app(email, approve, attend) {
    return this.firestore.collection("Database")
    .doc("appointment")
    .collection("Appointment", 
    ref=> ref
    .where("counsellorname", "==", email)
    .where("approveStatus", "==", approve)
    .where("attendanceStatus", "==", attend)
    .where("faculty", "==", "FIM")
    ).snapshotChanges();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return '${day}-${month}-${year}';
  }
}
