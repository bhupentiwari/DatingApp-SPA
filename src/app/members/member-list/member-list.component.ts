import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( d => {
      this.users = d['users'];
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
