import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { MemberDashboardComponent } from './member/member-dashboard/member-dashboard.component';
import { OwnerDashboardComponent } from './owner/owner-dashboard/owner-dashboard.component';
import { MachinesComponent } from './owner/owner-dashboard/machines/machines.component';
import { PlansComponent } from './owner/owner-dashboard/plans/plans.component';
import { TrainersComponent } from './owner/owner-dashboard/trainers/trainers.component';
import { MembersComponent } from './owner/owner-dashboard/members/members.component';
import { GymDetailsComponent } from './member/gym-details/gym-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { UserService } from './user/user.service';
import { AdminService } from './services/admin.service';
import { MemberService } from './services/member.service';
import { OwnerService } from './services/owner.service';

const routes: Routes = [
  { path: 'app-homepage', component: HomepageComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-register', component: RegisterComponent },
  // Admin
  { path: 'app-dashboard', component: DashboardComponent, canActivate: [UserService, AdminService] },
  { path: 'app-admin-profile', component: AdminProfileComponent, canActivate: [UserService, AdminService] },
  // Member
  { path: 'app-member-dashboard', component: MemberDashboardComponent, canActivate: [UserService, MemberService] },
  { path: 'app-member-profile', component: MemberProfileComponent, canActivate: [UserService, MemberService] },
  { path: 'app-gym-details', component: GymDetailsComponent, canActivate: [UserService, MemberService] },
  // Owner
  { path: 'app-owner-dashboard', component: OwnerDashboardComponent, canActivate: [UserService, OwnerService] },
  { path: 'app-owner-profile', component: OwnerProfileComponent, canActivate: [UserService, OwnerService] },
  { path: 'app-machines', component: MachinesComponent, canActivate: [UserService, OwnerService] },
  { path: 'app-plans', component: PlansComponent, canActivate: [UserService, OwnerService] },
  { path: 'app-trainers', component: TrainersComponent, canActivate: [UserService, OwnerService] },
  { path: 'app-members', component: MembersComponent, canActivate: [UserService, OwnerService] },
  // root
  { path: '', redirectTo: '/app-homepage', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    DashboardComponent,
    AdminProfileComponent,
    MemberDashboardComponent,
    MemberProfileComponent,
    GymDetailsComponent,
    OwnerDashboardComponent,
    OwnerProfileComponent,
    MachinesComponent,
    PlansComponent,
    TrainersComponent,
    MembersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatTableModule
  ],
  providers: [UserService, AdminService, MemberService, OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
