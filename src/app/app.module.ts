import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
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
import { FeedbackComponent } from './main/feedback/feedback.component';
import { SettingComponent } from './main/setting/setting.component';
import {NavigationService} from './Share/Services/navigation.service';
import {AttributeSliderComponent} from './Tool/attribute-slider/attribute-slider.component';
import {FeedbackService} from './main/feedback/feedback.service';
import {UserService} from './Share/Services/user.service';
import {ChartsModule} from 'ng2-charts';
import { RadarChartComponent } from './Tool/radar-chart/radar-chart.component';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {UserFilterPipe} from './main/feedback/userFilter.pipe';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import {AuthService} from './authentication/auth.service';
import { MainComponent } from './main/main.component';
import {MainService} from './main/main.service';
import {AttributeService} from './Share/Services/attribute.service';
import {CommentService} from './Share/Services/comment.service';
import { RegistrationComponent } from './registration/registration.component';
import { ImageRegistrationComponent } from './registration/image-registration/image-registration.component';
import { InfoRegistrationComponent } from './registration/info-registration/info-registration.component';
import { InstructionComponent } from './registration/instruction/instruction.component';
import { AWSService } from './Share/Services/AWS.service';

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
    RadarChartComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    RegistrationComponent,
    ImageRegistrationComponent,
    InfoRegistrationComponent,
    InstructionComponent
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
  providers: [NavigationService,
    FeedbackService,
    UserService,
    AuthService,
    MainService,
    AttributeService,
    CommentService,
    AWSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
