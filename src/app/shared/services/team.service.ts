import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUri='http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  findAllTeams(): Observable<Team []>{
    return this.http.get<Team []>(this.baseUri);
  }

  findTeam(id: string): Observable<Team>{
    return this.http.get<Team>(`${this.baseUri}/${id}`);
  }

  updateTeam(team: Team): Observable<Team>{
    return this.http.put<Team>(`${this.baseUri}/${team.id}`,team);
  }

  createTeam(value: string): Observable<Team> {
    return this.http.post<Team>(this.baseUri,{name:value});
  }


}
