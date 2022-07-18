import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM3MwcSzs8gHbGIbyzUl5xgJQ9jOLVw0o",
  authDomain: "mayordle.firebaseapp.com",
  databaseURL: "https://mayordle-default-rtdb.firebaseio.com",
  projectId: "mayordle",
  storageBucket: "mayordle.appspot.com",
  messagingSenderId: "19895541809",
  appId: "1:19895541809:web:7345c934e6bffda065f510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@NgModule({
  	declarations: [AppComponent],
  	imports: [BrowserModule],
  	providers: [],
  	bootstrap: [AppComponent],
})
export class AppModule {
}
