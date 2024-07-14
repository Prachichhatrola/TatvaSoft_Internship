import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit {
  localItem: string | null;
  users:User[] | any;
  constructor() { 

    this.localItem = localStorage.getItem("todos");
    if(this.localItem == null){
    this.users = [];
    }
    else{ 
      this.users = JSON.parse(this.localItem); 
    }

   }

  ngOnInit(): void {
  }

  deleteUser(user:User){
    console.log(user);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.users));
  }
  addUser(user:User){
    console.log(user); 
    this.users.push(user); 
    localStorage.setItem("todos", JSON.stringify(this.users));
  }
  toggleUser(user:User){ 
    const index = this.users.indexOf(user);
    console.log(index)
    this.users[index].active = !this.users[index].active;
    localStorage.setItem("todos", JSON.stringify(this.users));
    }
}
