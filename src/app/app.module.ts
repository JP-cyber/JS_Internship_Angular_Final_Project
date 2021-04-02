import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserPageComponent } from './new-user-page/new-user-page.component';
import { AuthService } from './shared/services/auth.service';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroService } from './shared/services/hero.service';
import { RecentSearchesService } from './shared/services/recent-searches.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NewUserPageComponent,
    HeroSelectionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HeroService,
    RecentSearchesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
