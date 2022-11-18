import { Exercise } from './exercise.model';

export class ExerciseDetail {
  id: string;
  workoutId: string;
  exerciseId: string;
  exercise: Exercise;
  set: number [];
}
