import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRedirectResult();
  }

  public async signInWithTwitter() {
    await this.authenticationService.signInWithTwitter();
  }

  private async getRedirectResult() {
    const result: firebase.auth.UserCredential = await this.authenticationService.getRedirectResult();
    try {
      if (result.credential) {
        this.router.navigate(['/weight/tabs/tab1']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
