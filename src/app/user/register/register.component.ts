import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { Gym } from 'src/app/models/Gym';
import { Subscriber } from 'src/app/models/Subscriber';
import { UserService } from './../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input()
  person: Person;
  gym: Gym;
  member: Subscriber;
  constructor(private UserServices: UserService) {
    this.person = new Person();
    this.gym = new Gym();
    this.member = new Subscriber();
  }

  onNext() {
    this.UserServices
      .registerUser(this.person)
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
        } else {
          alert('error occured');
        }
      });
  }

  registerOwner() {
    console.log(this.gym);
  }

  registerMember() {
    console.log(this.member);
  }


  ngOnInit() {
  }

}
