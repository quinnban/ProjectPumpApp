import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  user = Array(20).fill(0).map((x,i)=>i);


  constructor(private alertController: AlertController) { }

  ngOnInit() {
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
