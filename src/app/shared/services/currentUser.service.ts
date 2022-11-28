/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  user: BehaviorSubject<string> = new BehaviorSubject(null);


  async setUserId(id?: string){
    if(this.user.value){
      return;
    }
    if(id){
      this.user.next(id);
    } else {
      const {value } =  await Preferences.get({ key: 'profileId'});
      this.user.next(value);
    }
  }

}
