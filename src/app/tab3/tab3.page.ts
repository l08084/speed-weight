import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

/**
 * 設定タブ画面
 *
 * @export
 * @class Tab3Page
 */
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  /**
   * 利用規約画面に遷移する
   *
   * @memberof Tab3Page
   */
  public goToTermsOfService(): void {
    this.router.navigateByUrl('/terms-of-service');
  }

  /**
   * プライバシーポリシー画面に遷移する
   *
   * @memberof Tab3Page
   */
  public goToPrivacyPolicy(): void {
    this.router.navigateByUrl('/privacy-policy');
  }

  /**
   * サインアウト
   *
   * @returns {Promise<void>}
   * @memberof Tab3Page
   */
  public async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['']);
    } catch (err) {
      console.error(err);
    }
  }

}
