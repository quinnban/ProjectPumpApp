import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss'],
})
export class AddExerciseModalComponent implements OnInit, OnDestroy {
  @ViewChild('test') modal: ElementRef;
  shownExercises: Exercise [];
  exercises: Readonly<Exercise []>;
  filteredExercises: Exercise [];
  categories: string [];
  searchForm: FormGroup;
  sub: Subscription = Subscription.EMPTY;
  private offset  = 0;

  constructor(private modalCtrl: ModalController,private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.searchForm = this.createForm();
    this.sub = this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log(value);
      this.shownExercises = [];
      const list = this.filterCategory(value.categories);
      this.filteredExercises = this.filterSearch(list,value.search);
      this.offset = 0;
      this.showMoreExercises();
    });
    this.shownExercises = this.exercises.slice(0,10);
    this.offset = 10;
    this.categories = [... new Set(this.exercises.map(e => e.category))];
    console.log(this.categories);
  }

  onIonInfinite(event) {
    this.showMoreExercises();
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  clickSearch(){
    this.modal.nativeElement.parentNode.parentNode.setCurrentBreakpoint(1);
  }

  addExercise(e: Exercise){
    this.modalCtrl.dismiss(e,'confirm');
  }

  private createForm(){
    return this.fb.group({
      search:'',
      categories:[]
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

}
