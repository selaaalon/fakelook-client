import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SignupComponent } from './components/signup/signup.component';
import { TimelineViewComponent } from './components/timeline-view/timeline-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'main-page', component: MainPageComponent, children: [
    {path: 'map', component: MapViewComponent},
    {path: 'timeline', component: TimelineViewComponent},
    {path: '', redirectTo: 'timeline', pathMatch: 'full'},
  ]}

  // {path: 'map', component: MapViewComponent},
  // {path: 'timeline', component: TimelineViewComponent},
  // {path: '', redirectTo: 'timeline', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
