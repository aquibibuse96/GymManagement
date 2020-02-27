import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
import { MemberService } from 'src/app/services/member.service';
import { Plan } from 'src/app/models/Plan';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PlanElement {
  plan_id: number;
  plan_name: String;
  plan_description: String;
  price: number;
  gym_id: number;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlansComponent implements OnInit {
  id
  @Input()
  myGymId: number
  gymId
  plans: PlanElement[];
  isValid: boolean;
  plan: Plan;
  columnsToDisplay: any[];
  constructor(private router: Router, private router2: ActivatedRoute, private OwnerService: OwnerService, private MemberService: MemberService) {
    this.plan = new Plan();
    
  }

  onDelete(id) {
    const answer = confirm('are you sure you want to delete this plan?');
    if (answer === true) {
      this.OwnerService
        .deletePlan(id)
        .subscribe((response) => {
          const result = response.json();
          if (result.status === 'success') {
            this.ngOnInit();
          } else {
            alert('error occured');
          }
        });
    }
  }

  registerPlan(id) {
    this.plan.gym_id = id;
    this.OwnerService
      .addPlan(this.plan)
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          alert("Added Plan Successfully")
          this.ngOnInit();
        } else {
          alert('error occured');
        }
      })
  }

  getPlans(id) {
    const observable = this.OwnerService.getPlans(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.plans = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  getGymPlans(id) {
    const observable = this.MemberService.getGymPlans(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.plans = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage['tokenrole'] === 'owner') {
      this.id = sessionStorage['token'];
      this.getPlans(this.id);
      this.isValid = true;
      this.columnsToDisplay = ['plan_name', 'plan_description', 'plan_price', 'edit', 'delete'];

    } else {
      this.gymId = this.router2.snapshot.params.gymId;
      this.getGymPlans(this.gymId);
      this.isValid = false;
      this.columnsToDisplay = ['plan_name', 'plan_description', 'plan_price'];

    }
  }

}
