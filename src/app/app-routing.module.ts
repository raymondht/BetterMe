import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
