import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface StudentRegister {
  Name: string;
  Age: number;
  Address: string;
  Email: string;
  Password: string;
  UID: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    email: '',
    password: '',
  }

  student = {
    name: '',
    matric: '',
    faculty: '',
    gender: '',
    phone: '',
    campus: '',
  }

  counsellor = {
    name: '',
    gender: '',
    phone: '',
    room: '',
    key: '',
  }

  faculty = {
    name: '',
    matric: '',
    faculty: '',
    gender: '',
    phone: '',
    campus: '',
  }

  studentR: StudentRegister;

  studentForm: FormGroup;
  counsellorForm: FormGroup;
  facultyForm: FormGroup;
  testForm: FormGroup;

//Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;

  genderList = [
    {
      gender: 'Male',
      value: 'Male'
    },
    {
      gender: 'Female',
      value: 'Female'
    }
  ]

  facultyList = [
    
    {
      name: 'Faculty of Industrial Sciences and Technology',
      code: 'FIST',
      value: 'FIST'
    },
    {
      name: 'Faculty of Computing',
      code: 'FCOM',
      value: 'FCOM'
    },
    {
      name: 'Faculty of Chemical and Process Engineering Technology',
      code: 'FKKSA',
      value: 'FKKSA'
    },
    {
      name: 'Faculty of Civil Engineering Technology',
      code: 'FTKA',
      value: 'FTKA'
    },
    {
      name: 'Faculty of Electrical and Electronic Engineering Technology',
      code: 'FTKEE',
      value: 'FTKEE'
    },
    {
      name: 'Faculty of Manufacturing and Mechatronic Engineering Technology',
      code: 'FKP',
      value: 'FKP'
    },
    {
      name: 'Faculty of Mechanical and Automotive Engineering Technology',
      code: 'FTKMA',
      value: 'FTKMA'
    },
    {
      name: 'Faculty of Industrial Management',
      code: 'FIM',
      value: 'FIM'
    }
  ]

  campusList = [
    {
      name: 'Gambang',
      value: 'Gambang'
    },
    {
      name: 'Pekan',
      value: 'Pekan'
    }
  ]

  radio_list = [
    {
      role: 'Student',
      name: 'user-role',
      value: 'student',
      checked: true
    },
    {
      role: 'Counsellor',
      name: 'user-role',
      value: 'counsellor',
      checked: false
    },
    {
      role: 'Faculty',
      name: 'user-role',
      value: 'faculty',
      checked: false
    }
  ];

  radioSelect(event) {
    console.log("radioSelect ", event.detail);
    this.selectedRadioItem = event.detail;
    console.log(this.selectedRadioItem);
  }

  radioGroupChange(event) {
    //console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
    //console.log(this.selectedRadioGroup);
  }

  constructor(private router: Router,
    private menu: MenuController,
    public ngFireAuth: AngularFireAuth,
    public toastController: ToastController,
    public db: AngularFirestore,
    private firebaseService: FirebaseService,
    public userS: UserService,
    public alertController: AlertController,
    public fb: FormBuilder) 
    { 
      this.studentR = {} as StudentRegister;
    }

  ngOnInit() {

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

    this.studentForm = this.fb.group({
      Name: ['', [Validators.required]],
      MatricID: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      PhoneNum: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Faculty: ['', [Validators.required]],
    })

    this.counsellorForm = this.fb.group({
      Name: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      PhoneNum: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Room: ['', [Validators.required]],
      Key: ['', [Validators.required]],
    })

    this.facultyForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      PhoneNum: ['', [Validators.required]],
      Faculty: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Key: ['', [Validators.required]],
    })
    

    this.testForm = this.fb.group({
      Name: ['', [Validators.required]],
      MatricID: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      PhoneNum: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Faculty: ['', [Validators.required]],
      Role: ['', [Validators.required]],
    })
  }

  OnChange(event) {
    console.log("you have selected id= " + event.target.value);
  }

  async CreateStudentRecord() {

    //create user in Firebase Auth
    const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    console.log(user);

    console.log(this.student.faculty);
    var lol = this.student.faculty
    if(this.student.faculty == "FCOM" || this.student.faculty == "FKP" ||
        this.student.faculty == "FTKMA" || this.student.faculty == "FTKEE") {
      this.student.campus = "Pekan"
    }
    else if(this.student.faculty == "FIST" || this.student.faculty == "FIM" ||
              this.student.faculty == "FKKSA"  || this.student.faculty == "FTKA") {
      this.student.campus = "Gambang"
      
    }

    console.log(this.student.campus);
    //create student with id: email
    this.db.collection("Database")
    .doc("user")
    .collection("User")
    .doc("student")
    .collection("Student")
    .doc(this.user.email)
    .set({
      name: this.student.name,
      email: this.user.email,
      matric: this.student.matric,
      faculty: this.student.faculty,
      campus: this.student.campus,
      gender: this.student.gender,
      phone: this.student.phone,
      status: 'Normal',
    });
    
    console.log("Student registered");

    const toast = await this.toastController.create({
      message: 'Register Success.',
      duration: 1500
    });
    toast.present();

    this.router.navigate(['/login']);
    console.log(this.studentForm.value);
    this.studentForm.reset();
  }

  async CreateCounsellorRecord() {

    if(this.counsellorForm.value.Key == 5266) {
      //create user in Firebase Auth
      const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      console.log(user);

      //create student with id: email
        this.db.collection("Database")
        .doc("user")
        .collection("User")
        .doc("counsellor")
        .collection("Counsellor")
        .doc(this.counsellorForm.value.Email)
        .set({
          name: this.counsellorForm.value.Name,
          email: this.counsellorForm.value.Email,
          gender: this.counsellorForm.value.Gender,
          phone: this.counsellorForm.value.Name,
          room: this.counsellorForm.value.Room,
        });

        console.log("Counsellor registered");

        const toast = await this.toastController.create({
          message: 'Register Success.',
          duration: 1500
        });
        toast.present();

        this.router.navigate(['/login']);
        console.log(this.counsellorForm.value);
        
        //this.counsellorForm.reset();
    }
    else {
      this.failLogin();
    }
  }

  async CreateFacultyRecord() {
    if(this.facultyForm.value.Key == 1234) {

      //create user in Firebase Auth
      const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      console.log(user);
      
      console.log(this.faculty.faculty);
      var lol = this.faculty.faculty
      if(this.faculty.faculty == "FCOM" || this.faculty.faculty == "FKP" ||
          this.faculty.faculty == "FTKMA" || this.faculty.faculty == "FTKEE") {
        this.faculty.campus = "Pekan"
      }
      else if(this.faculty.faculty == "FIST" || this.faculty.faculty == "FIM" ||
                this.faculty.faculty == "FKKSA"  || this.faculty.faculty == "FTKA") {
        this.faculty.campus = "Gambang"
        
      }
      console.log(this.faculty.campus);
      //create student with id: email
        this.db.collection("Database")
        .doc("user")
        .collection("User")
        .doc("faculty")
        .collection("Faculty")
        .doc(this.facultyForm.value.Email)
        .set({
          name: this.facultyForm.value.Name,
          email: this.facultyForm.value.Email,
          gender: this.facultyForm.value.Gender,
          phone: this.facultyForm.value.PhoneNum,
          faculty: this.facultyForm.value.Faculty,
          campus: this.faculty.campus,
        });

        console.log("Faculty registered");

        const toast = await this.toastController.create({
          message: 'Register Success.',
          duration: 1500
        });
        toast.present();

        this.router.navigate(['/login']);
        console.log(this.facultyForm.value);
        
        //this.counsellorForm.reset();
    }
    else {
      this.failLogin();
    }
  }

 failLogin() {
  this.alertController.create({
    header: 'Register Failed',
    message: 'Wrong Security',
    buttons: [
      {
        text: 'Ok',
        handler: () => {}
      },
    ]
  }).then(res => {
    res.present();
  });
}

  ionViewWillEnter() {
    this.menu.enable(true, 'login-menu');
    }

}
