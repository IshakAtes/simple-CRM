import { Component, OnInit, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { NgIf } from '@angular/common';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
  authDomain: "simplecrm-b3a59.firebaseapp.com",
  projectId: "simplecrm-b3a59",
  storageBucket: "simplecrm-b3a59.appspot.com",
  messagingSenderId: "737703168763",
  appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
};

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogModule, NgIf, MatNativeDateModule, FormsModule, MatProgressBarModule, MatDialogActions, MatFormFieldModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  user!: User;
  changedUser!: User;
  birthDate!: Date | number | any;
  userId: any;
  loading = false;
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);

  constructor(private route:ActivatedRoute, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
  }

  ngOnInit(): void {
    this.changedUser = this.user;
    this.birthDate = new Date(this.changedUser.birthDate).getTime();
    console.log('init', this.birthDate);
    console.log('user', this.user.birthDate);
    console.log('changedUser', this.changedUser.birthDate);
  }

  async saveUser(){
    this.loading = true;
    const d = new Date(this.changedUser.birthDate).getTime();
    const docRef = doc(this.db, "users", this.userId)

    await updateDoc(docRef, {
      firstName: this.changedUser.firstName,
      lastName: this.changedUser.lastName,
      birthDate: d,
      email: this.changedUser.email,
      street: this.changedUser.street,
      zipCode: this.changedUser.zipCode,
      city: this.changedUser.city,
      id: this.userId
    })
    .then((result: any) => {
      this.loading = false;
      console.log('Adding finished', result);
      this.dialogRef.close();
    });
  }

  close(){
    this.birthDate = new Date(this.changedUser.birthDate).toLocaleDateString();
    // console.log(new Date(this.changedUser.birthDate.toLocaleDateString()));
    const d = new Date(this.changedUser.birthDate).getTime();
    console.log(d);
  }

}
