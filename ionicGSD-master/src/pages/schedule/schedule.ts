import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AttractionModel } from "../../app/models/attraction-model";
import { AttractionPage } from "../attraction/attraction";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html"
})
export class SchedulePage {

  public showDelete: boolean = false;

  public schedule: AttractionModel[] = [];

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.updateSchedule();
  }

  ionViewDidEnter() {
    this.updateSchedule();
    this.scheduleIsEmpty();
  }

  updateSchedule() {
    this.storage.ready().then(() => {
      this.storage.get("schedule").then(attractions => {
        this.fetchSchedule(attractions);
        console.log(attractions);
      });
    });
  }

  scheduleIsEmpty() {
    this.storage.ready().then( () => {
      this.storage.get("schedule").then(attractions => {
        let schedule: string[] = attractions;
        this.showDelete = schedule.length !== 0;
      })
    });
  }

  deleteSchedule() {
    this.storage.ready().then(() => {
      this.storage.set("schedule", []);
      this.ionViewDidEnter();
    });

  }

  goToAttractionPage(attraction: AttractionModel) {
    this.navCtrl.push(AttractionPage, { attraction: attraction });
  }

  fetchSchedule(attractions: string[]) {
    fetch("assets/data/attractions.json")
      .then(res => {
        if (res.status === 200) {
          return res.text();
        } else {
          throw Error("errorFetchingFile");
        }
      })
      .then(data => {
        let attraction: AttractionModel = new AttractionModel(
          "",
          "",
          "",
          "",
          "",
          4,
          [],
          "",
          "",
          ""
        );
        this.schedule = attraction.setupAttractionsSchedule(data, attractions);
      })
      .catch(err => {
        document.body.innerHTML = "Kunne ikke hente fil";
        console.error(err);
      });
  }
}
