import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CurrentUserService } from '../shared/services/currentUser.service';
import { RoleService } from '../shared/services/role.service';

@Component({
  selector: 'app-manage-workouts',
  templateUrl: './manage-workouts.page.html',
  styleUrls: ['./manage-workouts.page.scss'],
})
export class ManageWorkoutsPage implements OnInit {

  constructor(public menuCtrl: MenuController,
    private currentUserService: CurrentUserService,
              private roleService: RoleService) { }

  ngOnInit() {
    this.currentUserService.setUserId();
    this.roleService.setRole();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

}
