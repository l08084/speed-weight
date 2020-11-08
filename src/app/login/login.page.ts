import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SpinnerService } from '../services/spinner.service';

/**
 * ログイン画面のコンポーネントクラス
 *
 * @export
 * @class LoginPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.getRedirectResult();
  }

  /**
   * Twitterで認証する。
   *
   * @memberof LoginPage
   */
  public async signInWithTwitter() {
    await this.authenticationService.signInWithTwitter();
  }

  /**
   * Facebookで認証する。
   *
   * @memberof LoginPage
   */
  public async signInWithFacebook() {
    await this.authenticationService.signInWithFacebook();
  }

  /**
   * Googleで認証する。
   *
   * @memberof LoginPage
   */
  public async signInWithGoogle() {
    await this.authenticationService.signInWithGoogle();
  }

  /**
   * GitHubで認証する。
   *
   * @memberof LoginPage
   */
  public async signInWithGitHub() {
    await this.authenticationService.signInWithGitHub();
  }

  /**
   * リダイレクト後に呼び出される処理。
   *
   * @private
   * @memberof LoginPage
   */
  private async getRedirectResult() {
    this.spinnerService.show();
    const result: firebase.auth.UserCredential = await this.authenticationService.getRedirectResult();
    try {
      if (result.user != null) {
        this.router.navigate(['/weight/tabs/tab1']);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.spinnerService.hide();
    }
  }
}
