import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUri='http://localhost:3000/exercise';

  constructor(private http: HttpClient) { }

  findAllTeams(): Observable<Exercise []>{
    return this.http.get<Exercise []>(this.baseUri);
  }

  findTeam(id: string): Observable<Exercise>{
    return this.http.get<Exercise>(`${this.baseUri}/${id}`);
  }

  updateTeam(exercise: Exercise): Observable<Exercise>{
    return this.http.put<Exercise>(`${this.baseUri}/${exercise.id}`,exercise);
  }


}
