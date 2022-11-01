import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { SelectUsersModalComponent } from '../shared/componets/select-users-modal/select-users-modal.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  pictureUrl=null;

  constructor(private modalCtrl: ModalController) { }


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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SelectUsersModalComponent,
      componentProps: {orginialUsers: Array(20).fill(0).map((x,i)=>i)}
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data);
  }

}
