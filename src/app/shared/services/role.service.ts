/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../enums/roles.enum';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
   role: BehaviorSubject<Role> = new BehaviorSubject(null);


  async setRole(role?: string){
    if(this.role.value){
      return;
    }
    if(role){
      this.role.next(role as Role);
    } else {
      const {value } =  await Preferences.get({ key: 'role'});
      console.log(value);
      this.role.next(value as Role);
    }
  }

}
