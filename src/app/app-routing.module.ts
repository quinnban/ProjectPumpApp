import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'manage-teams',
    loadChildren: () => import('./manage-teams/manage-teams.module').then( m => m.ManageTeamsPageModule)
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  },
  {
    path: 'workouts',
    loadChildren: () => import('./workouts/workouts.module').then( m => m.WorkoutsPageModule)
  },
  {
    path: 'workout/:id',
    loadChildren: () => import('./workout-details/workout-details.module').then( m => m.WorkoutDetailsPageModule)
  },
  {
    path: 'create-team',
    loadChildren: () => import('./create-team/create-team.module').then( m => m.CreateTeamPageModule)
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./edit-team/edit-team.module').then( m => m.EditTeamPageModule)
  },
  {
    path: 'edit-workout',
    loadChildren: () => import('./edit-workout/edit-workout.module').then( m => m.EditWorkoutPageModule)
  },
  {
    path: 'manage-workouts',
    loadChildren: () => import('./manage-workouts/manage-workouts.module').then( m => m.ManageWorkoutsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
