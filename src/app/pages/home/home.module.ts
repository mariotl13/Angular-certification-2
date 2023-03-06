import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home.component';
import { GameResultDirective } from './card/game-result.directive';


@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    GameResultDirective
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    HomeComponent,
    CardComponent
  ]
})
export class HomeModule { }
