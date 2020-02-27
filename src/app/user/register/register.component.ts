import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { Gym } from 'src/app/models/Gym';
import { Subscriber } from 'src/app/models/Subscriber';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  person:Person;
  gym:Gym;
  member:Subscriber;

  constructor() {
    this.person = new Person();
    this.gym = new Gym();
    this.member = new Subscriber();
   }

  onNext(){
  }

  registerOwner(){
    console.log(this.gym);
    console.log(this.person);

  }

  registerMember(){
    console.log(this.member);
  }


  ngOnInit() {
  }

}
