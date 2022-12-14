/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Team } from '../shared/models/team.model';
import { TeamService } from '../shared/services/team.service';
import { switchMap } from 'rxjs/operators';
import { SelectItemsModalComponent } from '../shared/components/select-items-modal/select-items-modal.component';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { WorkoutService } from '../shared/services/workout.service';
import { Workout } from '../shared/models/workout.model';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {
  team: Team;
  teamForm: FormGroup;
  users: User [];
  workouts: Workout [];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private userService: UserService,
              private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.teamForm = this.buildForm();
    this.route.params.pipe(switchMap(params =>  this.teamService.findTeam(params.id))).subscribe(team => {
        this.team = team;
       this.patchForm(team);
      });
    this.userService.findAllUsers().subscribe(users => this.users = users);
    this.workoutService.findAllWorkouts().subscribe(workouts => this.workouts = workouts);

  }

  getUserItems(){
    return this.users?.map(u =>({id:u.id, name: u.firstName.concat(` ${u.lastName}`)}));
  }

  getWorkouItems(){
    return this.workouts?.map(workout => ({name: workout.name, id: workout.id,  description: workout.description}));
  }

  updateTeam(){
    // this.teamService.updateTeam(this.teamForm.value).subscribe(team => {
    //   this.patchForm(team);
    // });
    console.log(this.teamForm.value);
  }

  private patchForm(team: Team){
    this.teamForm.patchValue({
      name: team.name,
      users: team.users ? team.users?.map(user => ({name: user.firstName.concat(` ${user.lastName}`), id: user.id})) : [],
      workouts: team.workouts ? team.workouts.map(workout => ({name: workout.name, id: workout.id,  description: workout.description})) : []
    }) ;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: '',
      url: '',
      users: [],
      workouts: []
    });
  }

}
