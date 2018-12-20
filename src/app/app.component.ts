import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  decodeToken: any;
  jwtHelper = new JwtHelperService();

  constructor(private authoService: AuthService) {
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authoService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authoService.currentUser = user;
    }
  }
}
