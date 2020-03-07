import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminService {
  baseUrl = 'http://localhost:4000';

  // tslint:disable-next-line: deprecation
  constructor(private http: Http,
    private router: Router) { }

  public getGyms() {
    return this.http.get(this.baseUrl + '/gym');
  }

  public getMembers() {
    return this.http.get(this.baseUrl + '/member');
  }

  public getDetailedMembers() {
    return this.http.get(this.baseUrl + '/detailedMember');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['tokenrole'] !== 'admin') {
      return false;
    } else {
      return true;
    }
  }
}
