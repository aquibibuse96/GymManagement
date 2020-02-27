import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  gyms: any[];
  constructor(private router: Router, private MemberService: MemberService) { }

  gymDetails(gymId) {
    this.router.navigate(['/app-gym-details', { "gymId": gymId }]);
  }

  getAllGyms() {
    const observable = this.MemberService.getAllGyms();
    observable
      .subscribe((response) => {
        const result = response.json();
        // console.log(result);
        if (result.status === 'success') {
          this.gyms = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    this.getAllGyms();
  }

}
