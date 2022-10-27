import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Users', url: '/manage-users', icon: 'person' },
    { title: 'Teams', url: '/manage-teams', icon: 'people' },
    { title: 'Profile', url: '/profile', icon: 'person-circle' },
  ];
  constructor() {}
}
