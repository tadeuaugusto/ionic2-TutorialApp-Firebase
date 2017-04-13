import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService {


  public currentUser: string;
  public eventList: firebase.database.Reference;
  public profilePictureRef: firebase.storage.Reference;
  
  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`users/${this.currentUser}/eventList`);
    this.profilePictureRef = firebase.storage().ref('/guestProfile/');

  }
    
  getEventList(): firebase.database.Reference {
      return this.eventList;
  }
  
  getEventDetail(eventId): firebase.database.Reference {
      return this.eventList.child(eventId);
  }






  createEvent(eventName: string, eventDate: string, eventPrice: number, 
    eventCost: number): firebase.Promise<any> {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    });
  }

  addGuest(guestName, eventId, eventPrice, guestPicture = null): firebase.Promise<any> {
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.eventList.child(eventId).transaction( (event) => {
        event.revenue += eventPrice;
        return event;
      });
      if (guestPicture != null) {
        this.profilePictureRef.child(newGuest.key).child('profilePicture.png')
      .putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {
          this.eventList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
          .set(savedPicture.downloadURL);
        });        
      }
    });
  }
}
