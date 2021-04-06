import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NewUserPageComponent } from './new-user-page/new-user-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', component: HeroSelectionPageComponent, canActivate: [AuthGuard]},
    {path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: NewUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
