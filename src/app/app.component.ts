import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public sqlite: SQLite,public tasksService: TasksServiceProvider) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: HomePage },
      { title: 'Civilization', component: ListPage }
    ];

   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.createDatabase();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      this.tasksService.setDatabase(db);
      var result = this.tasksService.createTable();
      return result;
    })
    .then(() =>{
      this.splashScreen.hide();
      this.rootPage = 'HomePage';
    })
    .catch(error =>{
      console.error(error);
    });
  }

  
 

}
