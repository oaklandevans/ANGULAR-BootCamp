import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { DrumComponent } from './drum/drum.component';
import { GuitarComponent } from './guitar/guitar.component';
import { PianoComponent } from './piano/piano.component';

const fallbackRoute: Route = {
  path: '**', component: DefaultComponent
};

const routes: Routes = [
  {
    path: '',
    children: [
        { path: '', component: DefaultComponent },
        { path: 'piano', component: PianoComponent },
        { path: 'drum', component: DrumComponent },
        { path: 'guitar', component: GuitarComponent },
        fallbackRoute
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
