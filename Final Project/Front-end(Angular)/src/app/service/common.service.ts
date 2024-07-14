import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  apiUrl:string='http://localhost:5140/api';
  imageUrl:string='http://localhost:5140';
  searchList : BehaviorSubject<any> = new BehaviorSubject<any>('');

  GetMissionCountryList(){
    return this.http.get(`${this.apiUrl}/Common/MissionCountryList`);
  }
  GetMissionCityList(){
    return this.http.get(`${this.apiUrl}/Common/MissionCityList`);
  }
  GetMissionThemeList(){
    return this.http.get(`${this.apiUrl}/Common/MissionThemeList`);
  }
  GetMissionSkillList(){
    return this.http.get(`${this.apiUrl}/Common/MissionSkillList`);
  }
}
