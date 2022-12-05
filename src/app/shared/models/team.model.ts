import { User } from './user.model';
import { Workout } from './workout.model';

export class Team {
  id: string;
  name: string;
  users: User [];
  workouts: Workout [];
}
