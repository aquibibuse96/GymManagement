import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private service: UserService, private router: Router) {

    if (sessionStorage['tokenrole'] === undefined) {
      this.router.navigate(['/app-login']);
    } else if (sessionStorage['tokenrole'] === 'admin') {
      this.router.navigate(['/app-admin-profile']);
    } else if (sessionStorage['tokenrole'] === 'member') {
      this.service
      .memberRegisterationValidation(sessionStorage['token'])
      .subscribe((response) => {
        const result = response.json();
        if (result.data.length !== 0) {
          this.router.navigate(['/app-member-profile']);
        } else {
          this.router.navigate(['/app-member-dashboard']);
        }
      });
      // this.router.navigate(['/app-member-dashboard']);
      
    } else if (sessionStorage['tokenrole'] === 'owner') {
      this.router.navigate(['/app-owner-profile']);
    } else {
      this.router.navigate(['/app-dashboard']);
    }

  }
  onLogin() {
    this.service
      .loginUser(this.username, this.password)
      .subscribe((response) => {
        const token = response.headers.get('x-auth-token');
        sessionStorage['token'] = token;
        const tokenrole = response.headers.get('y-auth-token');
        sessionStorage['tokenrole'] = tokenrole;
        const tokenname = response.headers.get('z-auth-token');
        sessionStorage['tokenname'] = tokenname;

        const result = response.json();
        if (result.status === 'success') {
          if (result.data.role === 'admin') {
            this.router.navigate(['/app-dashboard']);
          } else if (result.data.role === 'member') {
            this.service
              .memberRegisterationValidation(token)
              .subscribe((response) => {
                const result = response.json();
                if (result.data.length !== 0) {
                  this.router.navigate(['/app-member-profile']);
                } else {
                  this.router.navigate(['/app-member-dashboard']);
                }
              });

          }
          else if (result.data.role === 'owner') {
            this.router.navigate(['/app-owner-dashboard']);
          }
        }
        else {
          alert('invalid email or password');

        }
      });
  }

  onRegister() {
    this.router.navigate(['/app-register']);
  }
  ngOnInit() {
  }

}
