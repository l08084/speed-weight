import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

/**
 * 認証のサービスクラス
 *
 * @export
 * @class AuthenticationService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {}

  /**
   * Twitter認証を呼び出す
   *
   * @returns {Promise<void>}
   * @memberof AuthenticationService
   */
  public signInWithTwitter(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.TwitterAuthProvider()
    );
  }
}