import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { UserProfileService } from '../../providers/user-profile-service';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class Users {

  private users: any;
  private loggedUser: any;
  
  constructor(private userProfileService: UserProfileService, 
        public navCtrl: NavController, public navParams: NavParams,
        private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }
  
  ionViewWillEnter() {
  
    // this.loadItems();
  }
  
  loadItems() {
    console.log('loadItems()');
    // this.loggedUser = this.userService.getByUserId();
    this.users = this.userService.getUsers();
  }

}
