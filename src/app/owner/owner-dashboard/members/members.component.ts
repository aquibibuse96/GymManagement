import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface MemberElement {
  first_name: string;
  last_name: string;
  age: number;
  Gender: string;
  phone_no: number;
  address: string;
  Weight: number;
  height: number;
  identity: string;
  price: number;
  plan_description: string;
  plan_name:string;
  pay_amount: number;
  paid_date: Date;
  mop: string;
  join_date: string;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MembersComponent implements OnInit {
  id
  gymId
  members: MemberElement[];
  columnsToDisplay = ['first_name', 'last_name', 'age', 'Gender', 'edit', 'delete'];
  expandedElement: MemberElement;
  @Input()
  myGymId: number
  constructor(private router: Router, private router2: ActivatedRoute, private OwnerService: OwnerService) { }


  getGymId(id) {

    const observable = this.OwnerService.getGymId(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.gymId = result.data[0].gym_id;
          this.OwnerService.getMembers(this.gymId).
            subscribe((response) => {
              const result = response.json();
              if (result.status === 'success') {
                this.members = result.data;
              } else {
                alert('error occured');
              }
            });
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    this.id = sessionStorage['token'];
    this.getGymId(this.id);
  }

}
