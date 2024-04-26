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
import { collection, query, onSnapshot, Firestore, getFirestore } from "firebase/firestore";
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  email: number;
  city: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', email: 1.0079, city: 'H'},
  {position: 2, name: 'Helium', email: 4.0026, city: 'He'},
  {position: 3, name: 'Lithium', email: 6.941, city: 'Li'},
  {position: 4, name: 'Beryllium', email: 9.0122, city: 'Be'},
  {position: 5, name: 'Boron', email: 10.811, city: 'B'},
  {position: 6, name: 'Carbon', email: 12.0107, city: 'C'},
  {position: 7, name: 'Nitrogen', email: 14.0067, city: 'N'},
  {position: 8, name: 'Oxygen', email: 15.9994, city: 'O'},
  {position: 9, name: 'Fluorine', email: 18.9984, city: 'F'},
  {position: 10, name: 'Neon', email: 20.1797, city: 'Ne'},
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
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  user = new User();
  displayedColumns: string[] = ['position', 'name', 'email', 'city'];
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
        dbUsers.push(doc.data());
      });
      ELEMENT_DATA = [];
      const data = dbUsers.forEach(element => {
        ELEMENT_DATA.push(element.userObject[0]);
        console.log('elementData', ELEMENT_DATA);
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
    // console.log('clData', clearData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  rowClicked(row : Object){
    console.log(row, typeof row);
  }



}
