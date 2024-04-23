import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAd0uPXiizGQhtdSWPkZHHXfr8KQcADhEI",
      authDomain: "simplecrm-b3a59.firebaseapp.com",
      projectId: "simplecrm-b3a59",
      storageBucket: "simplecrm-b3a59.appspot.com",
      messagingSenderId: "737703168763",
      appId: "1:737703168763:web:3e92a6c5bb7ad11af53e5e"
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
