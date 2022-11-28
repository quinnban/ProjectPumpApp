/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  _userId: BehaviorSubject<string> = new BehaviorSubject(null);
  user = this._userId.asObservable();

  async setUserId(id?: string){
    if(id){
      this._userId.next(id);
    } else {
      const {value } =  await Preferences.get({ key: 'profileId'});
      this._userId.next(value);
    }
  }

}
