import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loggedIn: string = "false";
  thisPass: string;
  passW: string;
  user: string;
  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController)  {

      storage.clear();
      this.checkLoggedInStatus();

  }

  checkLoggedInStatus() {
    this.storage.ready().then(() => {
      this.storage.get('loggedIn').then(lIn =>
        {
          this.loggedIn = lIn;
          this.user = lIn;

        if(this.user === "false" || this.user === undefined || this.user === null) {
          document.getElementById("login").style.display = "block";
          document.getElementById("logout").style.display = "none";
          document.getElementById("loginStatus").innerHTML = "Please log in";
          document.getElementById("loginParagraph").innerHTML = "Welcome, please create a user or login.";
          document.getElementById("navbarStatus").innerHTML = "Not logged in";
        }
        else if(this.loggedIn !== "false") {
          document.getElementById("loginStatus").innerHTML = "Great, you are now logged in!";
          document.getElementById("loginParagraph").innerHTML =
                      "You can now enjoy the app to its fullest! <br>"
                      +"You can write comments, and even add sights to your own schedule! <br>"
                      +"Have a look around and enjoy yourself. Come back here if you want to log out";
          document.getElementById("login").style.display = "none";
          document.getElementById("logout").style.display = "block";
          document.getElementById("navbarStatus").innerHTML = "Logged in as "+this.user;

        }
        else {
            this.loggedIn = "false";
            this.storage.set('loggedIn', "false");
            this.checkLoggedInStatus();
        }
      });
    });
      }

  ionViewDidEnter() {
    this.checkLoggedInStatus();
  }

    logOut() {
      this.storage.set('loggedIn', "false");
      this.loggedIn = "false";
      this.checkLoggedInStatus();
    }


  logIn() {


    const loginPrompt = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'Email',
          placeholder: 'username',
          type: 'email'
        },
        {
          name: 'Password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Send',
          handler: data => {
            this.storage.ready().then(() => {
              this.storage.get(data.Email).then((pass) =>
                {
                  this.passW = pass;
                  if(data.Password === this.passW) {
                    this.storage.ready().then(() => {
                      this.storage.set('loggedIn', data.Email);
                      this.user = data.Email;
                      this.checkLoggedInStatus();
                    });
                  }
                });
            });
          }
        }
      ]
    });
    loginPrompt.present();
  }

  createUser() {
    const createUser = this.alertCtrl.create({
      title: 'Create user',
      message: 'OBS: Use a dummy password, this is NOT enrypted!',
      inputs: [
        {
          name: 'Email',
          placeholder: 'username',
          type: 'email'
        },
        {
          name: 'firstPass',
          placeholder: 'password',
          type: 'password'
        },
        {
          name: 'secondPass',
          placeholder: 'confirm password',
          type: 'password'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Send',
          handler: data => {
            if(data.firstPass === data.secondPass){
              this.insertUserToStorage(data.Email, data.firstPass)
            }

          }
        }
      ]
    });
    createUser.present();
  }

  insertUserToStorage(email: string, password: string) {
    this.storage.ready().then(() => {
      this.storage.set(email, password).then(()=> {
        this.storage.ready().then(() => {
          this.storage.get(email).then(pass => {
            this.thisPass = pass;
            if(this.thisPass === password) {
              return true;
            }
            else if(this.thisPass !== password) {
              return false;
            }
            });
          });
        });
      });

}


}
