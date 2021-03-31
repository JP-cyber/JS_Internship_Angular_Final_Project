import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserPageComponent } from './new-user-page/new-user-page.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {path: '', component: HeroSelectionPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: NewUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
