import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { CategoryModel } from "../../app/models/category-model";
import { CategoryPage } from "../category/category";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  categories: CategoryModel[] = [];

  constructor(public navCtrl: NavController) {
    this.fetchCategories();
  }

  goToCategoryPage(category: string) {
    this.navCtrl.push(CategoryPage, {category: category});
  }

  fetchCategories() {
    fetch("assets/data/categories.json")
      .then(res => {
        if (res.status === 200) {
          return res.text();
        } else {
          throw Error("errorFetchingFile");
        }
      })
      .then(data => {
        let category: CategoryModel = new CategoryModel("", "", "");
        this.categories = category.setupCategories(data);
      })
      .catch(err => {
        document.body.innerHTML = "Kunne ikke hente fil";
        console.error(err);
      });
  }
}
