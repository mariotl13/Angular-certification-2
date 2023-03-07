import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';

const routes: Routes = [
  {
      path: '',
      component: ResultsComponent,
  },
];

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ResultsModule { }
