import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.page.html',
  styleUrls: ['./manage-teams.page.scss'],
})
export class ManageTeamsPage implements OnInit {

  team = Array(20).fill(0).map((x,i)=>i);


  constructor() { }

  ngOnInit() {
  }

}
