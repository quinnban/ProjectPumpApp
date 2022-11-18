import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUri='http://localhost:3000/exercise';

  constructor(private http: HttpClient) { }

  findAllTeams(): Observable<Workout []>{
    return this.http.get<Workout []>(this.baseUri);
  }

  findTeam(id: string): Observable<Workout>{
    return this.http.get<Workout>(`${this.baseUri}/${id}`);
  }

  updateTeam(workout: Workout): Observable<Workout>{
    return this.http.put<Workout>(`${this.baseUri}/${workout.id}`,workout);
  }


}
