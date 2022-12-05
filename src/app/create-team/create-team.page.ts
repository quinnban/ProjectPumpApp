import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { SelectItemsModalComponent } from '../shared/components/select-items-modal/select-items-modal.component';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  pictureUrl=null;
  selectedUsers=[];
  selectedUsersLabel: string;
  users: User[];

  constructor(private modalCtrl: ModalController, private userService: UserService) { }


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
    this.selectedUsersLabel = 'none';
    this.userService.findAllUsers().subscribe(users => this.users = users);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SelectItemsModalComponent,
      componentProps: {
        orginialItems: this.users.map(user => ({name: user.firstName.concat(` ${user.lastName}`), id: user.id})),
        selectedItems: this.selectedUsers.map(user => ({name: user.firstName.concat(` ${user.lastName}`), id: user.id}))
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.selectedUsers = data;
    if(this.selectedUsers.length!==0){
      this.selectedUsersLabel='';
      this.selectedUsers.forEach(u => this.selectedUsersLabel+='User '+ u + ', ');
      this.selectedUsersLabel = this.selectedUsersLabel.slice(0,-2);
    } else {
      this.selectedUsersLabel = 'none';
    }
  }


}
