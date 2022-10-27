import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  user = Array(20).fill(0).map((x,i)=>i);


  constructor() { }

  ngOnInit() {
  }

}
