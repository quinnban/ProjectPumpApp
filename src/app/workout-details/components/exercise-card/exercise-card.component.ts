import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ExerciseDetail } from 'src/app/shared/models/exerciseDetail.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent implements OnInit {

  @Input() exercise: ExerciseDetail;
  videoWidth;

  constructor(public platform: Platform, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    console.log(this.platform.width());
    this.videoWidth = this.platform.width()-32;
  }

  userclick(ev: any){
    console.log(ev);
  }

  openFullscreen(element){
    console.log(this.document.fullscreenEnabled);
    if(this.document.fullscreenEnabled){
      element.requestFullscreen();
    }
  }

}
