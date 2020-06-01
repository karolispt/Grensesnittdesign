import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {SchedulePage} from "../schedule/schedule";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = HomePage;
  tab3Root = SchedulePage;

  constructor() {

  }
}
