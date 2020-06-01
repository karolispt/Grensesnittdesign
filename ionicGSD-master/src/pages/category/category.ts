import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AttractionModel } from "../../app/models/attraction-model";
import { AttractionPage } from "../attraction/attraction";
import { NavParams } from "ionic-angular";

@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {
  attractions: AttractionModel[] = [];

  pageTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fetchAttractions(navParams.get("category"));
    this.pageTitle = this.navParams.get("category");
    this.navCtrl.swipeBackEnabled = true;
    console.log(this.attractions);
  }

  goToAttractionPage(attraction: AttractionModel) {
    this.navCtrl.push(AttractionPage, { attraction: attraction });
  }

  fetchAttractions(category: string) {
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
        this.attractions = attraction.setupAttractions(data, category);
        this.attractions.sort(
          (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
        );
      })
      .catch(err => {
        document.body.innerHTML = "Kunne ikke hente fil";
        console.error(err);
      });
  }
}
