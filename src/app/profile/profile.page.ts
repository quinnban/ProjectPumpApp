import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  pictureUrl=null;

  constructor(private alertController: AlertController) { }


  async changePicture(){
    const picture = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.pictureUrl = picture.webPath;
    let file;

    if(!picture.path){
      file = await fetch(picture.webPath).then(r => r.blob());
    } else {
      file = await Filesystem.readFile({
        path: picture.webPath,
      });
    }

    console.log(file);
  }

  ngOnInit() {
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Update Email',
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
        {
          placeholder: 'Confirm email',
          type:'email'
        },
      ],
    });

    await alert.present();

  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Update Password',
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
          placeholder: 'Password',
          type:'text'
        },
        {
          placeholder: 'Confirm password',
          type:'text'
        },
      ],
    });

    await alert.present();

  }

}
