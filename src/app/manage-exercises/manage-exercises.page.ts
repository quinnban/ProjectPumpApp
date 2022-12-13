import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
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
  exercises: Readonly<Exercise []>;
  filteredExercises: Exercise [];
  categories: string [];
  searchForm: FormGroup;
  sub: Subscription = Subscription.EMPTY;
  private offset  = 0;

  constructor(private exerciseService: ExerciseService,private fb: FormBuilder) { }

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
