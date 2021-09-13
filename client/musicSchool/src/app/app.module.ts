import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { PianoComponent } from './piano/piano.component';
import { DrumComponent } from './drum/drum.component';
import { GuitarComponent } from './guitar/guitar.component';
import { DefaultComponent } from './default/default.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MainComponent,
    PianoComponent,
    DrumComponent,
    GuitarComponent,
    DefaultComponent,
    GroupDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
