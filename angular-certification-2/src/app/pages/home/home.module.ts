import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
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
