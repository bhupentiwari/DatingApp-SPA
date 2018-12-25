import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( d => {
      this.users = d['users'].result;
      this.pagination = d['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";

  }
  pageChanged(event: any): void {
     this.pagination.currentPage = event.page;
     this.loadUsers();
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage,this.userParams)
    .subscribe(
      (u: PaginatedResult<User[]>) => {
        this.users = u.result;
        this.pagination = u.pagination;
     }, error => {
      this.alertify.error(error);
    });
  }

  // Commented as we are using now route resolver 
  // loadUsers() {
  //   this.userService.getUsers().subscribe((u: User[]) => {
  //     this.users = u;
  //     console.log( this.users);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
