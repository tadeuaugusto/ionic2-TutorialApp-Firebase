import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
import { Tabs } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  public signupForm;
  loading: any;
  pEmail = '';

  constructor(public nav: NavController, public authService: AuthService, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, private navParams: NavParams) {
    this.pEmail = navParams.get('email');
    console.log('AQU8ISDFUISFUAISUFISDUFIWEQEEEE');
    console.log(this.pEmail);
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: [this.pEmail, Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      // console.log(this.signupForm.value);
    } else {
      this.authService.signup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          // this.nav.setRoot(HomePage);
          this.nav.setRoot(Tabs);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
