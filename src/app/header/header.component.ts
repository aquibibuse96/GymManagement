import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = '';
  loginvalid: boolean;
  constructor(private router: Router) { }

  redirectLogin() {
    this.router.navigate(['/app-login']);
  }

  onLogo() {
    this.router.navigate(['/app-homepage']);
  }

  onDashboard() {
    if (sessionStorage['tokenrole'] === 'admin') {
      this.router.navigate(['/app-dashboard']);
    } else if (sessionStorage['tokenrole'] === 'member') {
      this.router.navigate(['/app-member-dashboard']);
    } else if (sessionStorage['tokenrole'] === 'owner') {
      this.router.navigate(['/app-owner-dashboard']);
    } else {
      this.router.navigate(['/app-dashboard']);
    }
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['/app-homepage']);
  }

  ngOnInit() {
    const name = sessionStorage['tokenname'];
    if (sessionStorage['tokenname'] === undefined) {
      this.user = 'Login';
      this.loginvalid = false;
    } else {
      this.user = name;
      this.loginvalid = true;
    }
  }
}


