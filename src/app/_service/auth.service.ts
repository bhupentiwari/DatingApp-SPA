import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject} from 'rxjs';
import { map} from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseURL = 'http://localhost:5000/api/auth/';
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  changeMemberPhoto(photURL: string) {
    this.photoUrl.next(photURL);
  }

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseURL + 'login', model).pipe(
        map( (response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.currentUser = user.user;
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.changeMemberPhoto(this.currentUser.photoUrl);
            //console.log(this.decodedToken);
          }
        })
      );
    }

    register(user: User) {
      return this.http.post(
        this.baseURL + 'register',
        user);
    }

    loggedIn() {
      const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}
