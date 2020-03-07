import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { MemberRegister } from './../../models/MemberRegister';
@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit {
  gymDetails: any;
  gymId: number;
  subscriber: any;
  person_id: number;
  reg: MemberRegister;
  plans2: any[];
  constructor(private router: Router, private router2: ActivatedRoute, private MemberServices: MemberService) {
    this.reg = new MemberRegister();
  }

  registerMember(id) {
    this.reg.subscriber_id = id;
    this.reg.gym_id = this.router2.snapshot.params.gymId;
    // console.log(this.reg);

    this.MemberServices
      .memberRegister(this.reg)
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          alert('You Have Register Successfully');
          this.ngOnInit();
        } else {
          alert('error occured');
        }
      });
  }

  getSubscriberDetails(person_id) {
    const observable = this.MemberServices.getSubscriberDetails(person_id);
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.subscriber = result.data[0];
        } else {
          alert('error occured');
        }
      });
  }

  getGymDetails(id) {
    const observable = this.MemberServices.getGymDetails(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.gymDetails = result.data[0];
        } else {
          alert('error occured');
        }
      });
  }

  getGymPlans(id) {
    const observable = this.MemberServices.getGymPlans(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.plans2 = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    this.gymId = this.router2.snapshot.params.gymId;
    this.getGymDetails(this.gymId);
    this.getGymPlans(this.gymId);
    this.person_id = sessionStorage['token'];
    this.getSubscriberDetails(this.person_id);
  }

}
