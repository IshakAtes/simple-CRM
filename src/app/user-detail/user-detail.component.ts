import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

const firebaseConfig = {
  apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
  authDomain: "simplecrm-b3a59.firebaseapp.com",
  projectId: "simplecrm-b3a59",
  storageBucket: "simplecrm-b3a59.appspot.com",
  messagingSenderId: "737703168763",
  appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
};

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userId: any = '';
  user: User = new User();
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);

  constructor(private route:ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  async getUser() {
    const docRef = doc(this.db, "users", this.userId);
    const docSnap = await getDoc(docRef);
    this.user = new User(docSnap.data());
    console.log(this.user);
  }

  editMenu() {
  }

  editUserDetails() {
    this.dialog.open(DialogEditUserComponent);
  }
}
