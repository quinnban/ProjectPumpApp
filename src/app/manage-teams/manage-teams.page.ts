import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/models/team.model';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.page.html',
  styleUrls: ['./manage-teams.page.scss'],
})
export class ManageTeamsPage implements OnInit {

  teams: Team [] = [];


  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.findAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

}
