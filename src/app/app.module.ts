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
import { AlphabetSelectComponent } from './alphabet-select/alphabet-select.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { RepeatSearchComponent } from './repeat-search/repeat-search.component';
import { ErrorService } from './shared/services/error.service';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { HeroBattleComponent } from './hero-battle/hero-battle.component';
import { BattleService } from './shared/services/battle.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortService } from './shared/services/sort.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NewUserPageComponent,
    HeroSelectionPageComponent,
    AlphabetSelectComponent,
    MainLayoutComponent,
    UserInfoComponent,
    RepeatSearchComponent,
    HeroInfoComponent,
    HeroBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HeroService,
    RecentSearchesService,
    ErrorService,
    BattleService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
