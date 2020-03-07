import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Person } from './../models/Person';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  baseUrl = 'http://localhost:4000';

  // tslint:disable-next-line: deprecation
  constructor(private http: Http, private router: Router) { }

  public loginUser(username, password) {
    // tslint:disable-next-line: deprecation
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // tslint:disable-next-line: deprecation
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      username: username,
      password: password
    };
    return this.http.post(this.baseUrl + '/login', body, requestOptions);
  }

  public registerUser(person: Person) {
    return this.http.post(this.baseUrl + '/app-register', person);
  }

  public memberRegisterationValidation(person_id) {
    return this.http.get(this.baseUrl + '/memberRegisterationValidation/' + person_id);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['tokenrole'] === undefined) {
      this.router.navigate(['/app-homepage']);
      return false;
    } else {
      return true;
    }
  }
}
