import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Team } from '../shared/models/team.model';
import { TeamService } from '../shared/services/team.service';
import { SelectUsersModalComponent } from '../shared/componets/select-users-modal/select-users-modal.component';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {
  team: Team;

  teamForm: FormGroup;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.teamForm = this.buildForm();
    this.route.params.subscribe(params => {
      this.teamService.findTeam(params.id).subscribe(team => {
        this.team = team;
        this.teamForm.patchValue({name: team.name});
      });
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SelectUsersModalComponent,
      componentProps: {
        orginialUsers: Array(20).fill(0).map((x,i)=>i),
        selectedUsers: []
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: '',
      url: ''
    });
  }

}
