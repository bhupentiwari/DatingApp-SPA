import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.apiURL;


constructor(private http: HttpClient) { }

// getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseURL + 'Users');
// }

getUsers(page?, itemPerPage?,userParams?): Observable<PaginatedResult<User[]>> {

  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();
  if (page != null && itemPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('PageSize', itemPerPage);
  }
  if (userParams != null) {

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('Gender', userParams.gender);
    params = params.append('OrderBy', userParams.orderBy);
  }

  return this.http.get<User[]>(this.baseURL + 'Users', {observe : 'response', params})
      .pipe(
          map(response => {
            //console.log(response);
            //console.log(response.body);
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null ) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
          })
      );
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseURL + 'Users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseURL + 'Users/' + id, user);
}
setMainPhoto(userID: number, id: number) {
  return this.http.post(this.baseURL + 'users/' + userID + '/photos/' + id + '/setMain', {});
}
deletePhoto(userID: number, id: number) {
  return this.http.delete(this.baseURL + 'users/' + userID + '/photos/' + id );
}
}
