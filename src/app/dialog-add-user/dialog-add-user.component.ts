import { Component, inject } from '@angular/core';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { addDoc, arrayUnion, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
  authDomain: "simplecrm-b3a59.firebaseapp.com",
  projectId: "simplecrm-b3a59",
  storageBucket: "simplecrm-b3a59.appspot.com",
  messagingSenderId: "737703168763",
  appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
};

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatFormFieldModule, MatDialogModule, MatInputModule, MatDatepicker, MatDatepickerModule, FormsModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);


  constructor() {}

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();

    await addDoc(collection(this.firestore, 'users'), {
      userObject: arrayUnion(this.user.toJSON())
    })
    .then((result: any) => {
      console.log('Adding user finished', result);
    });
  }
}
