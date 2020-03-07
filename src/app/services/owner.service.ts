import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Machine } from 'src/app/models/Machine';
import { Plan } from './../models/Plan';
import { Trainer } from './../models/Trainer';
import { Subscriber } from './../models/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class OwnerService implements CanActivate {
  baseUrl = 'http://localhost:4000';

  // tslint:disable-next-line: deprecation
  constructor(private http: Http,
    private router: Router) { }

  getGymId(id) {
    return this.http.get(this.baseUrl + '/gymId/' + id);
  }

  getMembers(id) {
    return this.http.get(this.baseUrl + '/gymMember/' + id);
  }

  getMachines(id) {
    return this.http.get(this.baseUrl + '/gymMachines/' + id);
  }

  getPlans(id) {
    return this.http.get(this.baseUrl + '/gymPlans/' + id);
  }
  getTrainers(id) {
    return this.http.get(this.baseUrl + '/gymTrainers/' + id);
  }
  // -------------------------------------------------------------------------------------
  addMachine(machine: Machine) {
    return this.http.post(this.baseUrl + '/addMachine', machine);
  }
  addPlan(plan: Plan) {
    return this.http.post(this.baseUrl + '/addPlan', plan);
  }
  addTrainer(trainer: Trainer) {
    return this.http.post(this.baseUrl + '/addTrainer', trainer);
  }
  addMember(member: Subscriber) {
    return this.http.post(this.baseUrl + '/addMember', member);
  }
  deleteMachine(id) {
    return this.http.delete(this.baseUrl + '/deleteMachine/' + id);
  }
  deletePlan(id) {
    return this.http.delete(this.baseUrl + '/deletePlan/' + id);
  }
  deleteTrainer(id) {
    return this.http.delete(this.baseUrl + '/deleteTrainer/' + id);
  }
  // -----------------------------------------------------------------------------
  updateMachine(machine: Machine, machine_id) {
    return this.http.put(this.baseUrl + '/updateMachine/' + machine_id, machine);

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['tokenrole'] !== 'owner') {
      return false;
    } else {
      return true;
    }
  }
}
