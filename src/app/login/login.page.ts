import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Roles } from '../shared/enums/roles.enum';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public menuCtrl: MenuController,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }


ionViewWillEnter() {
  this.menuCtrl.enable(false);
 }

 login(): void {
  this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(result => {
    console.log(result);
    if(result === Roles.USER){
      this.router.navigate(['workouts']);
    } else {
      this.router.navigate(['manage-workouts']);
    }
  });

 }

 createLoginForm(): FormGroup {
  return this.fb.group({
    username: '',
    password: ''
  });
 }

}
