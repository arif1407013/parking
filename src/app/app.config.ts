import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"parking-3712f","appId":"1:437162012310:web:233d197422a63a8f9e5cb7","storageBucket":"parking-3712f.appspot.com","apiKey":"AIzaSyB_0hkKAo0L-3GZjY_coGWlnBjW0P7h4WE","authDomain":"parking-3712f.firebaseapp.com","messagingSenderId":"437162012310","measurementId":"G-V0B2MTZH0X"})), provideFirestore(() => getFirestore())],
};
