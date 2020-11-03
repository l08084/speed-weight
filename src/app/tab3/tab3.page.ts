import { Component } from '@angular/core';
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

  constructor(private router: Router) {}

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

}
