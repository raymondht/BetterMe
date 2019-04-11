import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from './main/my-profile/my-profile.component';
import {NgModule} from '@angular/core';
import {FeedbackComponent} from './main/feedback/feedback.component';
import {SettingComponent} from './main/setting/setting.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {MainComponent} from './main/main.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
  {path: 'authentication', component: AuthenticationComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: '**', redirectTo: '/authentication/login'},
    ]
  },
  {path: 'main', component: MainComponent, children: [
      {path: 'home', component: MyProfileComponent},
      {path: 'feedback', component: FeedbackComponent},
      {path: 'feedback/:role', component: FeedbackComponent},
      {path: 'setting', component: SettingComponent},
      {path: '', component: MyProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
