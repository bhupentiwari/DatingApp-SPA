import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { AuthService } from '../../_service/auth.service';
import { AlertifyService } from '../../_service/alertify.service';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private userService: UserService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
        .subscribe(data => {
          this.alertify.success('You have liked: ' + this.user.knownAs);
        }, error => {
          this.alertify.error(error);
        });
  }
}
