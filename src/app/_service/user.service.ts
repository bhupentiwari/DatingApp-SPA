import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.apiURL;


constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'Users');
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseURL + 'Users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseURL + 'Users/' + id, user);
}
}
