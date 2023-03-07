import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TeamCardComponent } from './team-card/team-card.component';
import { HomeComponent } from './home.component';
import { GameResultDirective } from './team-card/game-result.directive';


@NgModule({
  declarations: [
    HomeComponent,
    TeamCardComponent,
    GameResultDirective
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    HomeComponent,
    TeamCardComponent
  ]
})
export class HomeModule { }
