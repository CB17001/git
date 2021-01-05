import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface StudentRegister {
  Name: string;
  Age: number;
  Address: string;
  Email: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    email: '',
    password: ''
  }

  studentR: StudentRegister;
  studentForm: FormGroup;

  constructor(private router: Router,
    public ngFireAuth: AngularFireAuth,
    public toastController: ToastController,
    public afstore: AngularFirestore,
    private firebaseService: FirebaseService,
    public userS: UserService,
    public fb: FormBuilder) 
    { 
      this.studentR = {} as StudentRegister;
    }

  ngOnInit() {
      this.studentForm = this.fb.group({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Email: ['', [Validators.required]]
    })
  }

  async CreateRecord() {
    const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);

    console.log(this.studentForm.value);
    this.firebaseService.create_user(this.studentForm.value).then(async resp => {
      this.studentForm.reset();
      const toast = await this.toastController.create({
        message: 'Register Success.',
        duration: 1500
      });
      toast.present();
      //this.router.navigate(['/login']);
    })
      .catch(error => {
        console.log(error);
      });
  }
}
