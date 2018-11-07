
import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksServiceProvider {

  db: SQLiteObject = null;

  constructor(public sqlite:SQLite) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)';
    return this.db.executeSql(sql, []);
  }

  getAll(){
    let sql = 'SELECT * FROM users';
    return this.db.executeSql(sql, [])
    .then(response => {
      let users = [];
      for (let index = 0; index < response.rows.length; index++) {
        users.push( response.rows.item(index) );
      }
      return Promise.resolve( users );
    })
    .catch(error => Promise.reject(error));
  }

  create(users: any){
   
    let sql = 'INSERT INTO users(name, password) VALUES(?,?)';
    
    return this.db.executeSql(sql, [users.name, users.password]);
  }

  update(users: any){
    let sql = 'UPDATE users SET name=?, password=? WHERE id=?';
    return this.db.executeSql(sql, [users.name, users.password, users.id]);
  }

  createUser(users: any) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO users(name, password) VALUES(?,?)',  [users.name, users.password])
      .then(res => {
        console.log(res);      
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
