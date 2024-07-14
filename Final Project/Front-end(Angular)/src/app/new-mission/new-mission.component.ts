import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.css']
})
export class NewMissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayStyle = "none";

  openPopup() {

    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
