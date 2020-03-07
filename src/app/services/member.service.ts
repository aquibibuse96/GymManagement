import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MemberRegister } from './../models/MemberRegister';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = 'http://localhost:4000';

  constructor(private http: Http,
    private router: Router) { }

  getAllGyms() {
    return this.http.get(this.baseUrl + '/getAllGyms');
  }
  getGymDetails(id) {
    return this.http.get(this.baseUrl + '/getGymDetails/' + id);
  }

  //-----------------------------------------------------------------------------------------
  getGymPlans(id) {
    return this.http.get(this.baseUrl + '/getGymPlans/' + id);
  }
  getGymTrainers(id) {
    return this.http.get(this.baseUrl + '/getGymTrainers/' + id);
  }
  getGymMachines(id) {
    return this.http.get(this.baseUrl + '/getGymMachines/' + id);
  }
  getSubscriberDetails(person_id) {
    return this.http.get(this.baseUrl + '/getSubscriberDetails/' + person_id);
  }
  // -----------------------------------------------------------------------------------------
  memberRegister(reg: MemberRegister) {
    return this.http.post(this.baseUrl + '/memberRegister', reg);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['tokenrole'] !== "member") {
      return false;
    } else {
      return true;
    }
  }
}
