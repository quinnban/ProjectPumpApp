import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageWorkoutsPage } from './manage-workouts.page';

const routes: Routes = [
  {
    path: '',
    component: ManageWorkoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageWorkoutsPageRoutingModule {}
