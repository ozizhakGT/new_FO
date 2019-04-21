// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components & Directives
import { AppComponent } from './app.component';
import {SitesComponent} from "./sites/sites.component";
import {SitesModule} from "./sites/sites.module";
import {TagsModule} from "./tags/tags.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SitesModule,
    TagsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
