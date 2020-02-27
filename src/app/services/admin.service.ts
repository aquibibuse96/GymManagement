import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Gym } from '../models/Gym';

@Injectable()
export class AdminService {
  baseUrl = 'http://localhost:4000';

  constructor(private http: Http,
    private router: Router) { }

  public getGyms() {
    return this.http.get(this.baseUrl+'/gym');
  }

  public getMembers() {
    return this.http.get(this.baseUrl+'/member');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['tokenrole'] !== "admin") {
        return false;
    }else {
        return true;
    }
  }
}
