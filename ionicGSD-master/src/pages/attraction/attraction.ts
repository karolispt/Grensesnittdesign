import { Component, ViewChild } from "@angular/core";
import {
  Events,
  NavController,
  NavParams,
  Navbar,
  AlertController, ToastController
} from "ionic-angular";
import { AttractionModel } from "../../app/models/attraction-model";
import { Storage } from "@ionic/storage";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator";
import { Platform } from "ionic-angular";

@Component({
  selector: "page-attraction",
  templateUrl: "attraction.html"
})
export class AttractionPage {
  attraction: AttractionModel;
  userRating: number;
  user: string;
  isFavorite = false;
  comments: { user; content }[];
  scheduleIcon: string = "heart-outline";
  @ViewChild("navbar") navBar: Navbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public storage: Storage,
    public alertCtrl: AlertController,
    private launchNavigator: LaunchNavigator,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {
    events.subscribe("star-rating:changed", starRating => {
      (this.userRating = starRating),
        console.log(this.userRating),
        (this.attraction.userRating = starRating);
    });
    this.attraction = this.navParams.get("attraction");

    this.comments = [
      { user: "Johnny", content: "I like this!" },
      { user: "Lee", content: "I hate this!" },
      { user: "Fredrick", content: "weird flex, but ok" }
    ];

    this.storage.ready().then(() => {
      this.storage.get(this.attraction.title).then(comments => {
        if (comments !== null) {
          this.comments = comments;
        }
      });
    });

    this.storage.ready().then(() => {
      this.storage.get("loggedIn").then(lIn => {
        this.user = lIn;
        if (
          this.user === undefined ||
          this.user === null ||
          this.user === "false"
        ) {
          this.user = "anon";
        }
      });
    });

    this.storage.ready().then(() => {
      this.storage.get("schedule").then(attractions => {
        if (attractions !== null && attractions.some( x => x === this.attraction.title)) {
          this.scheduleIcon = "heart";
        }
      })
    })
  }

  addToSchedule(attraction: AttractionModel) {
    this.storage.ready().then( () => {
      let schedule = [];
      this.storage.get("schedule").then(attractions => {
        schedule = attractions;
        if (schedule === null) schedule = [];
        if (!schedule.some( x => x === attraction.title)) {
          schedule.push(attraction.title);
          this.scheduleIcon = "heart";
          this.storage.set("schedule", schedule);
          const toast = this.toastCtrl.create({
            message: this.attraction.title + ' was added to your schedule',
            duration: 1000,
            position: "bottom"
          });
          toast.present();
          console.log(this.scheduleIcon);
        } else {
          const index = schedule.indexOf(attraction.title, 0);
          if (index > -1) {
            schedule.splice(index, 1);
            this.storage.set("schedule", schedule);
            this.scheduleIcon = "heart-outline";
            const toast = this.toastCtrl.create({
              message: this.attraction.title + ' was removed from your schedule',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
            console.log(this.scheduleIcon);
          }
        }
        console.log(schedule);
      });
    });
  }
  launchNavigation() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      const options: LaunchNavigatorOptions = {
        app: this.launchNavigator.APP.GOOGLE_MAPS,
        transportMode: this.launchNavigator.TRANSPORT_MODE.WALKING
      };

      this.launchNavigator
        .isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS)
        .then(() => {
          this.launchNavigator
            .navigate(this.attraction.title, options)
            .then(
              success => console.log("Launched navigator"),
              error => console.log("Error launching navigator", error)
            );
        });
    } else {
      console.log("Platform is not Android or iOS");
    }
    console.log("test" + this.platform._platforms);
  }

  ionViewDidLoad() {
    // Get comments
    this.navBar.backButtonClick = () => {
      console.log(this.attraction);
      this.navCtrl.pop();
    };
  }

  addComment() {
    const createComment = this.alertCtrl.create({
      title: "New comment",
      message: "writing comment as: " + this.user,
      inputs: [
        {
          name: "comment",
          placeholder: "write comment",
          type: "text"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {}
        },
        {
          text: "Send",
          handler: data => {
            this.comments.push({ user: this.user, content: data.comment });
            this.storage.ready().then(() => {
              this.storage.set(this.attraction.title.toString(), this.comments);
            });
          }
        }
      ]
    });
    createComment.present();


  }
}
