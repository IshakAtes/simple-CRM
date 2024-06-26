import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { initializeApp } from "firebase/app";
import { collection, query, onSnapshot, getFirestore } from "firebase/firestore";
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  email: number;
  city: string;
  id: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
];

const firebaseConfig = {
  apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
  authDomain: "simplecrm-b3a59.firebaseapp.com",
  projectId: "simplecrm-b3a59",
  storageBucket: "simplecrm-b3a59.appspot.com",
  messagingSenderId: "737703168763",
  appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
};


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule,RouterLink, MatIconModule, MatTooltipModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule, NgStyle],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  user = new User();
  displayedColumns: string[] = ['name', 'email', 'city', 'customerNo'];
  dataSource !: MatTableDataSource<PeriodicElement, MatPaginator>;
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const q = query(collection(this.db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dbUsers: any[] = [];

      querySnapshot.forEach((doc) => {
        const u = doc.data();
        u['id'] = doc.id;
        dbUsers.push(u);
      });
      ELEMENT_DATA = [];
      const data = dbUsers.forEach((element) => {
        ELEMENT_DATA.push(element);
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  rowClicked(row : Object){
    console.log('rowClicked', row, typeof row);
  }



}
