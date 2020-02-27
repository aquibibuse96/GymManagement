import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  person_id:number
  subscriber:any
  constructor(private MemberService:MemberService) {   }

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

  ngOnInit() {
    this.person_id = sessionStorage['token'];
    this.getSubscriberDetails(this.person_id);
  }

}
