import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthService } from '../../providers/auth-service';

import { Signup } from '../../pages/signup/signup';
import { ResetPassword } from '../../pages/reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public loginForm;

  private email: string = '';
  private password: string = '';
  private loading: any;
  
  constructor(public navCtrl: NavController,
                private authService: AuthService, 
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController, public formBuilder: FormBuilder) {
  
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  
  /**
  * Reset Password button
  */
  goToResetPassword() {
    this.navCtrl.push(ResetPassword);
  }
  
  /**
  * Login button
  */
  loginUser() {
  
  if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
        console.log(this.loginForm.value.email);
        this.showLoading();  

        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
            .then(data => {
                this.loading.dismiss();
            })
            .catch(error => {
                // console.log(error);
                // loading.dismiss();

                this.showError('Falha na autenticação', error);

                /*
                const alert = this.alertCtrl.create({
                    title: 'Falha na autenticação',
                    message: error.message,
                    buttons: [{text: 'Ok', handler: data => {this.loading.dismiss()}} ]
                });

                alert.present();
                */
            })
    
    }
  }
  
  showError(erro, mensagem) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
          title: erro,
          subTitle: mensagem.message,
          buttons: ['OK']
        });
        prompt.present();
  }

  
  showLoading() {
    this.loading = this.loadingCtrl.create({
        content: 'Efetuando login...'
    });
    this.loading.present();
  }
  
  /**
  * Signup button
  */
  openSignupPage() {
    console.log('openSignupPage()');
    console.log(this.email);
    
    this.navCtrl.push(Signup, {
                email: this.loginForm.value.email
                // password: this.password
    });
    
  }

}
