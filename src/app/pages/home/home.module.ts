import { NgModule } from '@angular/core';
import { TeamCardComponent } from './team-card/team-card.component';
import { HomeComponent } from './home.component';
import { GameResultDirective } from './team-card/game-result.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    TeamCardComponent,
    GameResultDirective
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
