import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser } from '../models/updateUser.model';
import { UploadPicture } from '../models/uploadPitcure';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri='http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<User []>{
    return this.http.get<User []>(this.baseUri);
  }

  findUser(id: string): Observable<User>{
    return this.http.get<User>(`${this.baseUri}/${id}`);
  }

  updateUser(user: UpdateUser): Observable<User>{
    return this.http.put<User>(`${this.baseUri}/${user.id}`,user);
  }

  updateProfilePicture(id){
    return this.http.get<UploadPicture>(`${this.baseUri}/${id}/uploadProfilePicture`);
  }
}