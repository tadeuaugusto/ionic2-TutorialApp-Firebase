import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { UserProfileService } from '../../providers/user-profile-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  public userProfile: any;
  public birthDate: string;
  
  // image
  nativepath: any;
  
  imgsource: any;

  
  constructor(private userProfileService: UserProfileService, 
    public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public zone: NgZone) {
  
  }
  
  
  ionViewDidEnter(){

    this.userProfileService.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }
  
  updateUserProfile() {
    let alert = this.alertCtrl.create({
      message: "Editar Usuario",
      inputs: [
        {
          name: 'name',
          placeholder: 'seu nome',
          value: this.userProfile.name
        },
        {
          name: 'birthDate',
          placeholder: 'sua data de nascimento',
          value: this.userProfile.birthDate
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.userProfileService.updateName(data.name);
            this.userProfileService.updateDOB(data.birthDate);
          }
        }
      ]
    });
    alert.present();
  }
  
  uploadImageProfile() {
  this.userProfileService.uploadimage();
    
  }
  
 
  displayImageProfile() {
    // this.imgsource = this.userProfileService.displayImageProfile();
    
  }
  
  
  
  
  updateName(){
    let alert = this.alertCtrl.create({
      message: "Nome do Usuario",
      inputs: [
        {
          name: 'name',
          placeholder: 'seu nome',
          value: this.userProfile.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.userProfileService.updateName(data.name);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate) {
    this.birthDate = birthDate;
  }

}
