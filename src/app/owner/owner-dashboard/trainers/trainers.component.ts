import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { OwnerService } from 'src/app/services/owner.service';
import { Trainer } from './../../../models/Trainer';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface TrainerElement {
  trainerId: number;
  first_name: String;
  last_name: String;
  trainer_type: String;
  salary: Float32Array;
  photo: String;
  phone_no: String;
  join_date: Date;
  end_date: Date;
  address: String;
  age: number;
  Gender: String;
  gym_id: number;

}
@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TrainersComponent implements OnInit {
  trainers: TrainerElement[];
  id;
  isValid: boolean;
  @Input()
  myGymId: number;
  gymId;
  trainer: Trainer;
  columnsToDisplay: any[];

  constructor(private router: Router, private router2: ActivatedRoute,
    private OwnerServices: OwnerService, private MemberServices: MemberService) { this.trainer = new Trainer(); }

  onDelete(id) {
    const answer = confirm('are you sure you want to delete this Trainer?');
    if (answer === true) {
      this.OwnerServices
        .deleteTrainer(id)
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

  registerTrainer(id) {
    this.trainer.gym_id = id;
    this.OwnerServices
      .addTrainer(this.trainer)
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          alert('Added Machine Successfully');
          this.ngOnInit();
        } else {
          alert('error occured');
        }
      });
  }

  getTrainers(id) {
    const observable = this.OwnerServices.getTrainers(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.trainers = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  getGymTrainers(id) {
    const observable = this.MemberServices.getGymTrainers(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.trainers = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage['tokenrole'] === 'owner') {
      this.id = sessionStorage['token'];
      this.getTrainers(this.id);
      this.isValid = true;
      this.columnsToDisplay = ['first_name', 'last_name', 'trainer_type', 'address', 'age', 'Gender', 'edit', 'delete'];

    } else {
      this.gymId = this.router2.snapshot.params.gymId;
      this.getGymTrainers(this.gymId);
      this.isValid = false;
      this.columnsToDisplay = ['first_name', 'last_name', 'trainer_type', 'address', 'age', 'Gender'];
      // var element = document.getElementById("expandedElement");
      // element.hidden = true;
      // document.getElementById("expandedElement").style.display='none';
      document.getElementById('expandedElement').style.display = 'none';
    }
  }
}
