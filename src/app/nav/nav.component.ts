import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  Login() {

    this.authService.login(this.model).subscribe(next => {
        console.log('login successfully');
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  loggedOut() {
      localStorage.removeItem('token');
      console.log('logged out successfully');
  }
}
