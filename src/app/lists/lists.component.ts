import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { User } from '../_models/User';
import { Pagination, PaginatedResult } from '../_models/Pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;
    
  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.users = d['users'].result;
      console.log(this.users);
      this.pagination = d['users'].pagination;
      console.log(this.pagination);
    });
    this.likesParam = 'Likers';
  }
  loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage
      , null , this.likesParam)
    .subscribe(
      (u: PaginatedResult<User[]>) => {
        this.users = u.result;
        this.pagination = u.pagination;
     }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination);
 }

}
