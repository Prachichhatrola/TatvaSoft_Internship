import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() i: number | undefined;
  @Output() userDelete: EventEmitter<User> = new EventEmitter();
  @Output() userCheckbox: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onClick(user: any){
    this.userDelete.emit(user);
    console.log("onClick has been triggerd")
  }
  onCheckboxClick(user:any){
    console.log(user)
    this.userCheckbox.emit(user);
  }
}
