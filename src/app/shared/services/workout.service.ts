import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  baseUri='http://localhost:3000/workout';

  constructor(private http: HttpClient) { }

  findAllWorkouts(): Observable<Workout []>{
    return this.http.get<Workout []>(this.baseUri);
  }

  findWorkout(id: string): Observable<Workout>{
    return this.http.get<Workout>(`${this.baseUri}/${id}`);
  }

  updateWorkout(workout: Workout): Observable<Workout>{
    return this.http.put<Workout>(`${this.baseUri}/${workout.id}`,workout);
  }

  createWorkout(workout: Workout): Observable<Workout>{
    return this.http.post<Workout>(this.baseUri,workout);
  }


}
