import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
  authDomain: "simplecrm-b3a59.firebaseapp.com",
  projectId: "simplecrm-b3a59",
  storageBucket: "simplecrm-b3a59.appspot.com",
  messagingSenderId: "737703168763",
  appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
};



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'simpleCRM';
  firestore: Firestore = inject(Firestore);
  app = initializeApp(firebaseConfig);
  items$: Observable<any[]>;

  constructor() {
    const itemCollection = collection(this.firestore, 'users');
    this.items$ = collectionData(itemCollection);
    console.log('update', this.items$.subscribe((g) => {
      console.log('GameUpdate', g);
    }));
  }
}
