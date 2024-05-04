import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { collection, query, where, onSnapshot } from "firebase/firestore";

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
  showUserBirthdate!: string;

  constructor(private route:ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  async getUser() {
    // const docRef = doc(this.db, "users", this.userId);
    // const docSnap = await getDoc(docRef);
    // this.user = new User(docSnap.data());
    // this.showUserBirthdate = new Date(this.user.birthDate).toLocaleDateString();

    const q = query(collection(this.db, "users"), where("id", "==", this.userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.user = new User(change.doc.data());
          this.showUserBirthdate = new Date(this.user.birthDate).toLocaleDateString();
          console.log("New user: ", change.doc.data());
        }
        if (change.type === "modified") {
          this.user = new User(change.doc.data());
          this.showUserBirthdate = new Date(this.user.birthDate).toLocaleDateString();
          console.log("Modified user: ", change.doc.data());
        }
        if (change.type === "removed") {
          this.user = new User(change.doc.data());
          this.showUserBirthdate = new Date(this.user.birthDate).toLocaleDateString();
          console.log("Removed user: ", change.doc.data());
        }
      });
    });
  }

  editMenu() {
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }
}





// async getUser() {
//   const docRef = doc(this.db, "users", this.userId);
//   const docSnap = await getDoc(docRef);
//   this.user = new User(docSnap.data());
//   this.showUserBirthdate = new Date(this.user.birthDate).toLocaleDateString();
// }