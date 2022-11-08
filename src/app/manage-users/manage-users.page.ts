import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  users: User [] = [];


  constructor(private alertController: AlertController,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  async inviteUser(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Invite a user',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            console.log(value);
            //do http return false is error
            //return false;
          },
      },
      {
        role:'cancel',
        text:'cancel'
      }
    ],
      inputs: [
        {
          placeholder: 'Email',
          type:'email'
        },
      ],
    });

    await alert.present();

  }

}
