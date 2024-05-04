import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { addDoc, arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatDialogActions, MatFormFieldModule, MatDialogModule, MatInputModule, MatDatepicker, MatDatepickerModule, FormsModule, MatProgressBarModule, NgIf],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    await addDoc(collection(this.firestore, 'users'), {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      email: this.user.email,
      street: this.user.street,
      zipCode: +this.user.zipCode,
      city: this.user.city,
    })
    .then((result: any) => {
      this.loading = false;
      console.log('Adding user finished', result);
      this.dialogRef.close();
    });
  }

}
