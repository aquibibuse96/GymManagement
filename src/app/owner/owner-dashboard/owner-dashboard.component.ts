import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  constructor(private router: Router, private OwnerService: OwnerService) { }
  id: number
  gymId: number
  gymDetails: any

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getGymId(id) {
    const observable = this.OwnerService.getGymId(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        this.gymDetails = result;
        if (result.status === 'success') {
          this.gymId = result.data[0].gym_id;
        }
      });
  }

  ngOnInit() {
    this.id = sessionStorage['token'];
    this.getGymId(this.id);
  }

}
