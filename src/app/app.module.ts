import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import {environment} from '../environments/environment';
import {firebaseConfig, firebaseDevConfig} from '../environments/firebase.config';
import { SearchComponent } from './Tool/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingComponent } from './setting/setting.component';
import {NavigationService} from './Share/Services/navigation.service';
import {AttributeSliderComponent} from './Tool/attribute-slider/attribute-slider.component';
import {FeedbackService} from './feedback/feedback.service';
import {DatabaseService} from './Share/Services/database.service';
import {ChartsModule} from 'ng2-charts';
import { RadarChartComponent } from './Tool/radar-chart/radar-chart.component';
import {MyProfileService} from './my-profile/my-profile.service';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {UserFilterPipe} from './feedback/userFilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserFilterPipe,
    MyProfileComponent,
    HeaderComponent,
    TabMenuComponent,
    SearchComponent,
    FeedbackComponent,
    SettingComponent,
    AttributeSliderComponent,
    RadarChartComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule,
    environment.production ? AngularFireModule.initializeApp(firebaseConfig) : AngularFireModule.initializeApp(firebaseDevConfig),
    AngularFireDatabaseModule,
    ChartsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [NavigationService, FeedbackService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
