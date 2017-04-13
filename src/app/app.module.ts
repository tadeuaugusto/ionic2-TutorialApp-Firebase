import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';
import { UserProfileService } from '../providers/user-profile-service';
import { HttpModule } from '@angular/http';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Feeds } from '../pages/feeds/feeds';
import { Users } from '../pages/users/users';
import { Tabs } from '../pages/tabs/tabs';
import { Profile } from '../pages/profile/profile';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { EventCreate } from '../pages/event-create/event-create';
import { Events } from '../pages/events/events';
import { EventDetail } from '../pages/event-detail/event-detail';
import { EventService } from '../providers/event-service';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    Signup,
    Feeds,
    Users,
    Tabs,
    Profile,
    EventCreate,
    Events,
    EventDetail,
    ResetPassword
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Login,
    Signup,
    Feeds,
    Users,
    Tabs,
    Profile,
    EventCreate,
    Events,
    EventDetail,
    ResetPassword
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserProfileService,
    FileChooser,
    UserService,
    EventService,
    Camera
  ]
})
export class AppModule {}
