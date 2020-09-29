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

  ngOnInit() {}

  public async signInWithTwitter() {
    try {
      await this.authenticationService.signInWithTwitter();
      this.router.navigate(['/weight/tabs/tab1']);
    } catch (error) {
      console.log(error);
    }
  }
}
