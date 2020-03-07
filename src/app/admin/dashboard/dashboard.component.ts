import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface OwnerElement {
  first_name: string;
  last_name: string;
  gym_name: string;
  gym_loc: string;
  phone_no: number;
  address: string;
}

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
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashboardComponent implements OnInit {
  owners: OwnerElement[];
  members: MemberElement[];
  columnsToDisplay = ['first_name', 'last_name', 'gym_name', 'gym_loc', 'edit', 'delete'];
  columnsToDisplay1 = ['first_name', 'last_name', 'age', 'Gender', 'edit', 'delete'];
  expandedElement: OwnerElement;
  expandedElement1: MemberElement;
  constructor(private router: Router, private AdminServices: AdminService) { }

  getGyms() {
    const observable = this.AdminServices.getGyms();
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.owners = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  getMembers() {
    const observable = this.AdminServices.getMembers();
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.members = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    this.getGyms();
    this.getMembers();
  }

}


