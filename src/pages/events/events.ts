import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventCreate } from '../../pages/event-create/event-create';
import { EventService } from '../../providers/event-service';
import { EventDetail } from '../../pages/event-detail/event-detail';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class Events {

  public eventList: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Events');
  }
  
  addItem() {
    this.navCtrl.push(EventCreate);
  }
  
  ionViewDidEnter(){
      this.eventService.getEventList().on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
            name: snap.val().name,
            price: snap.val().price,
            date: snap.val().date,
          });
        return false
        });
        this.eventList = rawList;
      });
    }
    
    
    goToEventDetail(eventId): void {
      this.navCtrl.push(EventDetail, {
        eventId: eventId
      });
    }

}
