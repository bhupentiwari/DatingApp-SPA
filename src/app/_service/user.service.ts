import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.apiURL;


constructor(private http: HttpClient) { }

// getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseURL + 'Users');
// }

getUsers(page?, itemPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {

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

  if (likesParam === 'Likers') {
    params = params.append('likers', 'true');
  }
  if (likesParam === 'Likees') {
    params = params.append('likees', 'true');
  }
  return this.http.get<User[]>(this.baseURL + 'Users', {observe : 'response', params})
      .pipe(
          map(response => {
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
sendLike(id: number, receipientId: number) {
  return this.http.post(this.baseURL + 'users/' + id + '/like/' + receipientId, {} );
}
getMessages(id: number, page?, itemPerPage?, messageContainer?)  {
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
  let params = new HttpParams();
  params = params.append('MessageContainer', messageContainer);
  if (page != null && itemPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('PageSize', itemPerPage);
  }
  return this.http.get<Message[]>(this.baseURL + 'users/' + id + '/messages', { observe : 'response', params})
      .pipe(
        map( res => {
          paginatedResult.result = res.body;
          if (res.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse (res.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
}
getMessageThread(id: number, receipientId: number) {
  return this.http.get<Message[]>(this.baseURL + 'users/' + id + '/messages/thread/' + receipientId);
}
sendMessage(id: number, message: Message) {
  return this.http.post(this.baseURL + 'users/' + id + '/messages', message);
}
deleteMessage(id: number, userId: number) {
  return this.http.post(this.baseURL + 'users/' + userId + '/messages/' +  id, {} );
}
markAsRead(userId: number, messageId: number) {
  this.http.post(this.baseURL + 'users/' + userId + '/messages/'
              + messageId + '/read', {}).subscribe();
}
}
