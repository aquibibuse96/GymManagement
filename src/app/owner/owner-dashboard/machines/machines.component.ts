import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { OwnerService } from 'src/app/services/owner.service';
import { Machine } from 'src/app/models/Machine';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface MachineElement {
  machine_id: number;
  machine_name: String;
  machine_type: String;
  purchase_date: Date;
  gym_id: number;
}

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MachinesComponent implements OnInit {
  machines: MachineElement[];
  columnsToDisplay:any[];
  expandedElement: MachineElement;
  id
  gymId
  @Input()
  myGymId: number
  isValid: boolean;
  machine: Machine;
  mac1: Machine;
  flag: boolean = true;
  constructor(private router: Router, private router2: ActivatedRoute, private OwnerService: OwnerService, private MemberService: MemberService) {
    this.machine = new Machine();
    this.mac1 = new Machine();
    
  }
  toggleFlag() {
    if (this.flag == false) {
      this.flag = !this.flag;
    }
  }

  editMachine(machine: Machine) {
    this.machine = machine;
    this.flag = false;
  }

  updateMachine() {
    this.mac1.machine_id = this.machine.machine_id;
    this.mac1.machine_name = this.machine.machine_name;
    this.mac1.machine_type = this.machine.machine_type;
    this.mac1.purchase_date = this.machine.purchase_date;
    this.mac1.gym_id = this.machine.gym_id;

    this.addMachine(this.mac1);
  }

  registerMachine(gym_id) {
    this.flag = true;
    this.machine.gym_id = gym_id;
    this.addMachine(gym_id);

  }

  onDelete(id) {
    const answer = confirm('are you sure you want to delete this machine?');
    if (answer === true) {
      this.OwnerService
        .deleteMachine(id)
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

  addMachine(machine: Machine) {

    if (this.flag == false) {
      this.OwnerService
        .updateMachine(machine, machine.machine_id)
        .subscribe((response) => {
          const result = response.json();
          if (result.status === 'success') {
            alert("Updated Machine Successfully");
            this.ngOnInit();
          } else {
            alert('error occured');
          }
        })


    } else {

      this.OwnerService
        .addMachine(this.machine)
        .subscribe((response) => {
          const result = response.json();
          if (result.status === 'success') {
            alert("Added Machine Successfully");
            this.ngOnInit();
          } else {
            alert('error occured');
          }
        })
    }
  }

  getMachines(id) {
    const observable = this.OwnerService.getMachines(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.machines = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  getGymMachines(id) {
    const observable = this.MemberService.getGymMachines(id);
    observable
      .subscribe((response) => {
        const result = response.json();
        if (result.status === 'success') {
          this.machines = result.data;
        } else {
          alert('error occured');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage['tokenrole'] === 'owner') {
      this.id = sessionStorage['token'];
      this.getMachines(this.id);
      this.isValid = true;
      this.columnsToDisplay = ['machine_name', 'machine_type', 'purchase_date', 'edit', 'delete'];
    } else {
      this.gymId = this.router2.snapshot.params.gymId;
      this.getGymMachines(this.gymId);
      this.isValid = false;
      this.columnsToDisplay = ['machine_name', 'machine_type', 'purchase_date'];
    }
  }
}
