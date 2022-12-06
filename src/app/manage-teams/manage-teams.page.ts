import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Team } from '../shared/models/team.model';
import { TeamService } from '../shared/services/team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.page.html',
  styleUrls: ['./manage-teams.page.scss'],
})
export class ManageTeamsPage implements OnInit {

  teams: Team [] = [];


  constructor(private teamService: TeamService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.teamService.findAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  async createTeamAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Create a team',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            this.createTeam(value[0]);
            //do http return false is error
            return false;
          },
      },
      {
        role:'cancel',
        text:'cancel'
      }
    ],
      inputs: [
        {
          placeholder: 'Team name',
          type:'text'
        },
      ],
    });

    await alert.present();

  }

  private async createTeam(name: string){
    const screen = await this.loadingController.create();
    screen.present();
    this.teamService.createTeam(name).subscribe(team =>{
        this.teams.push(team);
        this.loadingController.dismiss();
        this.alertController.dismiss();
        this.router.navigate(['team',team.id,]);
      },err => {
      this.loadingController.dismiss();
      console.log(err);
      return false;
    });
  }

}
