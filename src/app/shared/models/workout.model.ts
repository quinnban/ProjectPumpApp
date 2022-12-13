import { ExerciseDetail } from './exerciseDetail.model';

export class Workout {
  id: string;
  name: string;
  description: string;
  exercises: ExerciseDetail [];
}
