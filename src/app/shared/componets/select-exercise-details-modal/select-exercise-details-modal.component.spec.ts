import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectExerciseDetailsModalComponent } from './select-exercise-details-modal.component';

describe('SelectExerciseDetailsModalComponent', () => {
  let component: SelectExerciseDetailsModalComponent;
  let fixture: ComponentFixture<SelectExerciseDetailsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExerciseDetailsModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectExerciseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
