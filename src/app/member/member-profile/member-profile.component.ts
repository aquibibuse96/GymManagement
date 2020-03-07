import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  person_id: number;
  subscriber: any;
  constructor(private MemberService: MemberService,private router: Router) {   }

  getSubscriberDetails(person_id) {
    const observable = this.MemberService.getSubscriberDetails(person_id);
    observable
      .subscribe((response) => {
        const result = response.json();
        console.log(result);
        if (result.status === 'success') {
          this.subscriber = result.data[0];
        } else {
          alert('error occured');
        }
      });
  }

  browseGym() {
    this.router.navigate(['/app-member-dashboard']);
  }
  ngOnInit() {
    this.person_id = sessionStorage['token'];
    this.getSubscriberDetails(this.person_id);
  }

}
