import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventService } from '../../providers/event-service';

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreate {

  constructor(public navCtrl: NavController, public eventService: EventService) {}

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): void {

      this.eventService.createEvent(eventName, eventDate, eventPrice, eventCost)
        .then( () => {
            this.navCtrl.pop();
      });
  }
  
  

}