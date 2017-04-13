import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class UserService {

  private fireAuth: any;
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public firestore: any;
  public users: any;
  public name: any;
  
  constructor(public http: Http) {
    console.log('Hello UserService Provider');
    // this.currentUser = firebase.auth().currentUser.uid;
    // this.users = firebase.database().ref('users');
    
    
  }
  
  getByUserId() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      this.name = snapshot.val().name;
      // ...
    });
  }
  
  getUsers(): firebase.database.Reference {
    this.updateSession();
    return firebase.database().ref('/users/');
    // return firebase.database().ref('users');
    /*
    return this.userProfile.child
    this.users = firebase.database().ref('users');
    var self = this;
    return this.users.once('value').then(function(snapshot) {
        // We need to create this array first to store our local data
        let rawList = [];
        snapshot.forEach( snap => {
        rawList.push({
         name: snap.name,
         // birthDate: snap.birthDate
        });
         });
        self.users = rawList;
        });
        
        // return self.users;
    /////////
    var self = this;
    var ref = firebase.database().ref('users');
    ref.once('users').then(function(snapshot) {
        // We need to create this array first to store our local data
        let rawList = [];
        snapshot.forEach( snap => {
        rawList.push({
         name: snap.name,
         // birthDate: snap.birthDate
        });
         });
        self.users = rawList;
        });
        
        return self.users;
    */
  }
  
  
  updateSession() {
    if (this.fireAuth == null) {
        this.fireAuth = firebase.auth();
        if (this.currentUser == null) {
            this.currentUser = this.fireAuth.currentUser;
        }
    }
    if (this.userProfile == null) {
        this.userProfile = firebase.database().ref('users');
        
    }
    if (this.firestore == null) {
        this.firestore = firebase.storage();
    }
    
    
    
  }

}
