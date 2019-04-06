import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {NgModule} from '@angular/core';
import {FeedbackComponent} from './feedback/feedback.component';
import {SettingComponent} from './setting/setting.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MyProfileComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'feedback/:role', component: FeedbackComponent},
  {path: 'setting', component: SettingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
