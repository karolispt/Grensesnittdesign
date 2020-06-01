import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";

import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { SchedulePage } from "../pages/schedule/schedule";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { CategoryPage } from "../pages/category/category";
import { AttractionPage } from "../pages/attraction/attraction";
import { StarRatingModule } from "ionic3-star-rating";
import { LaunchNavigator } from "@ionic-native/launch-navigator";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SchedulePage,
    LoginPage,
    CategoryPage,
    AttractionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SchedulePage,
    LoginPage,
    CategoryPage,
    AttractionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    LaunchNavigator
  ]
})
export class AppModule {}
