import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Users } from '../users/users';
import { Events } from '../events/events';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {

  events = Events;
  users = Users;

}
