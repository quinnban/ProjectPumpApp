import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Role } from '../shared/enums/roles.enum';
import { AuthService } from '../shared/services/auth.service';
import { CurrentUserService } from '../shared/services/currentUser.service';
import { RoleService } from '../shared/services/role.service';
import { LoadingController } from '@ionic/angular';

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
              private router: Router,
              private roleService: RoleService,
              private currentUserService: CurrentUserService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }


ionViewWillEnter() {
  this.menuCtrl.enable(false);
 }

 async login(): Promise<void> {
  const loading = await this.loadingController.create();
  await loading.present();
  this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(async result => {
    console.log(result);
    await loading.dismiss();
    if(result.role === Role.USER){
      this.router.navigate([result.profileId,'workouts']);
    } else {
      this.router.navigate(['manage-workouts']);
    }
  });

 }

 createLoginForm(): FormGroup {
  return this.fb.group({
    email: '',
    password: ''
  });
 }

}
