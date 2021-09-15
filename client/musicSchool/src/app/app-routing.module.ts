import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DrumComponent } from './drum/drum.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GuitarComponent } from './guitar/guitar.component';
import { HomeComponent } from './home/home.component';
import { NewClassComponent } from './new-class/new-class.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { PianoComponent } from './piano/piano.component';

const fallbackRoute: Route = {
  path: '**', component: HomeComponent
};

const routes: Routes = [
  {
    path: '',
    children: [
        { path: '', component: HomeComponent },
        { path: 'piano', component: PianoComponent },
        { path: 'drum', component: DrumComponent },
        { path: 'guitar', component: GuitarComponent },
        { path: 'piano/new-class', component: NewClassComponent },
        { path: 'drum/new-class', component: NewClassComponent },
        { path: 'guitar/new-class', component: NewClassComponent },
        { path: 'piano/group-details', component: GroupDetailsComponent },
        { path: 'drum/group-details', component: GroupDetailsComponent },
        { path: 'guitar/group-details', component: GroupDetailsComponent },
        { path: 'piano/group-details/new-student', component: NewStudentComponent},
        { path: 'drum/group-details/new-student', component: NewStudentComponent},
        { path: 'guitar/group-details/new-student', component: NewStudentComponent},
        fallbackRoute
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
