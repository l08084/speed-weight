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
   * Twitter認証を呼び出す。
   * 認証成功時にリダイレクトする。
   *
   * @returns {Promise<void>}
   * @memberof AuthenticationService
   */
  public signInWithTwitter(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  /**
   * Facebook認証を呼び出す。
   * 認証成功時にリダイレクトする。
   *
   * @returns {Promise<void>}
   * @memberof AuthenticationService
   */
  public signInWithFacebook(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  /**
   * Google認証を呼び出す。
   * 認証成功時にリダイレクトする。
   *
   * @returns {Promise<void>}
   * @memberof AuthenticationService
   */
  public signInWithGoogle(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  /**
   * GitHub認証を呼び出す。
   * 認証成功時にリダイレクトする。
   *
   * @returns {Promise<void>}
   * @memberof AuthenticationService
   */
  public signInWithGitHub(): Promise<void> {
    return this.afAuth.signInWithRedirect(
      new firebase.auth.GithubAuthProvider()
    );
  }

  /**
   * リダイレクト後の処理。
   *
   * @returns {Promise<firebase.auth.UserCredential>}
   * @memberof AuthenticationService
   */
  public getRedirectResult(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.getRedirectResult();
  }

  /**
   * ログインしているアカウントの情報を返す
   *
   * @returns {Promise<firebase.User>}
   * @memberof AuthenticationService
   */
  public getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }
}
