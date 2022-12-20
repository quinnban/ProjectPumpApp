import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Exercise } from '../shared/models/exercise.model';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-manage-exercises',
  templateUrl: './manage-exercises.page.html',
  styleUrls: ['./manage-exercises.page.scss'],
})
export class ManageExercisesPage implements OnInit {

  shownExercises: Exercise [];
  exercises: Exercise [];
  filteredExercises: Exercise [];
  categories: string [];
  searchForm: FormGroup;
  sub: Subscription = Subscription.EMPTY;
  private offset  = 0;

  constructor(private exerciseService: ExerciseService,
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.exerciseService.findAllExercises().subscribe(ex => {
      this.exercises = ex;
      this.filteredExercises = ex;
      this.shownExercises = this.exercises.slice(0,10);
      this.offset = 10;
      this.categories = [... new Set(this.exercises.map(e => e.category))];
    });
    this.searchForm = this.createForm();
    this.sub = this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.shownExercises = [];
      const list = this.filterCategory(value.categories);
      this.filteredExercises = this.filterSearch(list,value.search);
      this.offset = 0;
      this.showMoreExercises();
    });
  }

  onIonInfinite(event) {
    this.showMoreExercises();
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  async createExerciseAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Create an exercise',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            this.createExercise(value[0]);
            //do http return false is error
            return false;
          },
      },
      {
        role:'cancel',
        text:'cancel'
      }
    ],
      inputs: [
        {
          placeholder: 'Exercise name',
          type:'text'
        },
      ],
    });

    await alert.present();

  }

  private async createExercise(name: string){
    const screen = await this.loadingController.create();
    screen.present();
    this.exerciseService.createExercise(name).subscribe(exercise => {
      this.exercises.push(exercise);
      this.loadingController.dismiss();
      this.alertController.dismiss();
      this.router.navigate(['exercise',exercise.id,]);
    },err => {
    this.loadingController.dismiss();
    console.log(err);
    return false;
  });
  }

  private showMoreExercises(){
    const diff = this.filteredExercises.length - this.offset;
    if(diff === 0){
      return;
    }
    if(this.offset <= diff+ 10){
      this.shownExercises.push(...this.filteredExercises.slice(this.offset,(this.offset+10)));
      this.offset +=10;
    } else {
      this.shownExercises.push(...this.filteredExercises.slice(this.offset,(this.offset+diff)));
      this.offset = this.filteredExercises.length;
    }
  }

  private filterCategory(categories: string []): Exercise []{
    if(categories.length === 0){
      return [...this.exercises];
    }
    return this.exercises.filter(e => categories.includes(e.category));
  }

  private filterSearch(list: Exercise [], search: string): Exercise []{
    return list.filter(e => e.name.toLowerCase().includes(search.toLocaleLowerCase()));
  }

  private createForm(){
    return this.fb.group({
      search:'',
      categories:[]
    });
  }


}
