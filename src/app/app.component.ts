import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';
import { Tabs } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = Login;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;
  // @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  // rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService
  ) {
    this.initializeFirebase();
    this.initializeApp();
    this.setupPageAccess();
   
    
  }

  setupPageAccess() {
    // set our app's pages
    this.pages = [
      { title: 'Principal', component: this.rootPage },
      { title: 'Minha Conta', component: Profile },
      { title: 'Sair', component: null}
    ];
  }
  
  initializeFirebase() {
    /**
    * FIREBASE
    **/
    firebase.initializeApp({
        // apiKey: "AIzaSyBeyT9wYhMwMPLGHsDkPn308CuEuw3_Wyw",
        // authDomain: "ionic2shoppinglist.firebaseapp.com"
        apiKey: "AIzaSyBWeTynMxk_Rn8DKgjyEKNuyG9AqRvKVYI",
        authDomain: "https://forumapp-c5d67.firebaseio.com/",
        databaseURL: "https://forumapp-c5d67.firebaseio.com/",
        storageBucket: "gs://forumapp-c5d67.appspot.com"
    });
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.isAuthenticated = true;
            // this.nav.setRoot(this.tabsPage);
            this.rootPage = Tabs;
        } else {
            this.isAuthenticated = false;
            // this.nav.setRoot(this.signinPage);
            this.rootPage = Login;
        }
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menuCtrl.close();
    // navigate to the new page if it is not the current page
    
    if (page.component != null) {
        this.nav.setRoot(page.component);
    } else {
        this.onLogout();  
    }
    
  }
  
  onLogout() {
    console.log('LOGOUT...');
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(Login);
  }
}
