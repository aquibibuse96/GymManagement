import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  gyms: any[];
  src = '../../assets/images/gym4.jfif';
  constructor(private router: Router, private MemberServices: MemberService) { }

  gymDetails(gymId) {
    this.router.navigate(['/app-gym-details', { 'gymId': gymId }]);
  }

  getAllGyms() {
    const observable = this.MemberServices.getAllGyms();
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
