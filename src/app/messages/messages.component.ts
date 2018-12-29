import { Component, OnInit } from '@angular/core';

import { Pagination, PaginatedResult } from '../_models/Pagination';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;


 // messageContainer = 'Unread';
  messageContainer = 'Inbox';
  constructor(private authService: AuthService,
      private userService: UserService, private alertify: AlertifyService,
      private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(d => {
      this.messages = d['messages'].result;
      this.pagination = d['messages'].pagination;
    });
    this.loadUserMessages();
  }

  loadUserMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((p: PaginatedResult<Message[]>) => {
        this.messages = p.result;
        this.pagination = p.pagination;
     }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUserMessages();
    console.log(this.pagination);
 }
 deleteMessage(id: number) {
   this.alertify.confirm('Are you sure you want to delete the message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe( () => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
          this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
   });
 }
}
