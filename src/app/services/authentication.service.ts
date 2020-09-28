import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {}

  public signInWithTwitter(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
}
