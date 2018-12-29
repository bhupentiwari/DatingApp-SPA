import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  newMessage: any = {};
  messages: Message[];
  constructor(private authService: AuthService, private userService: UserService,
     private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessageThread();
  }

  loadMessageThread() {
      const currentUserId = +this.authService.decodedToken.nameid;
      this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
        .pipe(
          tap(messages => {
            for (let index = 0; index < messages.length; index++) {
              if (messages[index].isRead === false && messages[index].recipientId === currentUserId) {
                    this.userService.markAsRead(currentUserId, messages[index].id);
              }
            }
          })
        )
        .subscribe( resp => {
          this.messages = resp;
          console.log(this.messages);
        }, error => {
          this.alertify.error(error);
        });
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid,
      this.newMessage).subscribe((m: Message) => {
      this.messages.unshift(m);
      this.newMessage = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}
