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
  private _role: BehaviorSubject<Role> = new BehaviorSubject(null);
  role = this._role.asObservable();

  async setRole(){
   const {value } =  await Preferences.get({ key: 'role'});
   console.log(value);
    this._role.next(value as Role);
  }

}
