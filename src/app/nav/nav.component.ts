import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, 
    private route: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
        this.alertify.success('login successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.route.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
  loggedOut() {
      localStorage.removeItem('token');
      this.alertify.message('logged out successfully');
      this.route.navigate(['/home']);
  }
}
