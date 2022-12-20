import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  baseUri='http://localhost:3000/exercise';

  constructor(private http: HttpClient) { }

  findAllExercises(): Observable<Exercise []>{
    return this.http.get<Exercise []>(this.baseUri);
  }
  createExercise(name: string): Observable<Exercise>{
    return this.http.post<Exercise>(this.baseUri,{name});
  }

  findExercise(id: string): Observable<Exercise>{
    return this.http.get<Exercise>(`${this.baseUri}/${id}`);
  }

  updateExercise(exercise: Exercise): Observable<Exercise>{
    return this.http.put<Exercise>(`${this.baseUri}/${exercise.id}`,exercise);
  }


}
