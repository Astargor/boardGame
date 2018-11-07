import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:any[] = [];
  registra:boolean = true;
  login:boolean = true;
  nombre:string ="";
  password:string ="";

  constructor(public navCtrl: NavController, public tasksService: TasksServiceProvider) {}

    ionViewDidLoad(){
     // this.getAllUsers();
    }

  getAllUsers(){
    this.tasksService.getAll().then(x=> {
      this.users = x;
    })
    .catch (error => {
      console.error(error);
    });
  }

  registrar(){
    if(this.registra == true){

      this.registra = false;
    }else{
      this.registra = true;
    }
   
  }

  registrarUser(){

    console.log(this.nombre);
    var user:any;
    user = [this.nombre,this.password];
    this.tasksService.createUser(user);
   
  }

  logea(){
    if(this.login == true){

      this.login = false;
    }else{
      this.login = true;
    }
  }

}
