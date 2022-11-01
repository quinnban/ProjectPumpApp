import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-users-modal',
  templateUrl: './select-users-modal.component.html',
  styleUrls: ['./select-users-modal.component.scss'],
})
export class SelectUsersModalComponent implements OnInit {

  orginialUsers: number[] = [];
  selectedUsers: number[] = [];
  filteredUsers: number[] = [];


  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
    if(this.orginialUsers.length === 0) {
      this.orginialUsers = Array(20).fill(0).map((x,i)=>i);
    }
    this.filteredUsers = [...this.orginialUsers];
  }

  cancel(): void {
     this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
     this.modalCtrl.dismiss( this.selectedUsers,'confirm');
  }

  userClicked(user): void {

    if(this.isUserSelected(user)){
      this.selectedUsers = this.selectedUsers.filter(u => u!== user);
      console.log(this.selectedUsers);
      return;
    }
    this.selectedUsers.push(user);
    console.log(this.isUserSelected(user));

  }
  isUserSelected(user): boolean{
    return this.selectedUsers.includes(user);
  }

  userSearched(event): void {
  //add filter logic here once we are using the user model
  }

}
