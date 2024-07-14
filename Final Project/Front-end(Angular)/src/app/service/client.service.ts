import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Country, Mission } from '../model/cms.model';
import { MissionApplication } from '../model/missionApplication.model';
import { user, UserDetail } from '../model/user.model';
import { VolunteeringGoals, VolunteeringHours } from '../model/volunteering.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  apiUrl:string='http://localhost:5140/api';
  imageUrl:string='http://localhost:5140';

  //HomePage
  MissionList(userId:any):Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/ClientMission/ClientSideMissionList/${userId}`);
  }
  MissionClientList(data:any){
    return this.http.post(`${this.apiUrl}/ClientMission/MissionClientList`,data);
  }
  MissionDetailByMissionId(data:any){
    return this.http.post(`${this.apiUrl}/ClientMission/MissionDetailByMissionId/`,data);
  }
  ApplyMission(data:any){debugger;
     return this.http.post(`${this.apiUrl}/ClientMission/ApplyMission`,data);
  }

  //ShareYourStory
  MissionTitleList():Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/Story/GetMissionTitle`);
  }

  UploadImage(data:any){
    return this.http.post(`${this.apiUrl}/Common/UploadImage`,data);
  }

  LoginUserDetailById(id:any):Observable<user[]>{
    return this.http.get<user[]>(`${this.apiUrl}/Login/LoginUserDetailById/${id}`);
  }
  CountryList():Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/Common/CountryList`);
  }
  CityList(countryId:any):Observable<City[]>{
    return this.http.get<City[]>(`${this.apiUrl}/Common/CityList/${countryId}`);
  }
  //Add Skill
  AddUserSkill(data:any){
    return this.http.post(`${this.apiUrl}/Common/AddUserSkill`,data);
  }
  GetUserSkill(userId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/Common/GetUserSkill/${userId}`);
  }

  LoginUserProfileUpdate(userDetail:UserDetail){
      return this.http.post(`${this.apiUrl}/Login/LoginUserProfileUpdate`,userDetail);
  }

  GetUserProfileDetailById(userId:any){
    return this.http.get<UserDetail[]>(`${this.apiUrl}/Login/GetUserProfileDetailById/${userId}`);
  }

  ContactUs(data:any)
  {
    return this.http.post(`${this.apiUrl}/Common/ContactUs`,data);
  }


  //Volunteering TimeSheet Hours
  GetMissionTitle():Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/Common/MissionTitleList`);
  }

  //Volunteering Timesheet Hours
  GetVolunteeringHoursList(userid:any):Observable<VolunteeringHours[]>{
    return this.http.get<VolunteeringHours[]>(`${this.apiUrl}/VolunteeringTimesheet/GetVolunteeringHoursList/${userid}`);
  }
  GetVolunteeringHoursById(id:number):Observable<VolunteeringHours[]>{
    return this.http.get<VolunteeringHours[]>(`${this.apiUrl}/VolunteeringTimesheet/GetVolunteeringHoursListById/${id}`);
  }

  VolunteeringMissionList(id:number):Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/VolunteeringTimesheet/VolunteeringMissionList/${id}`);
  }
  AddVolunteeringHours(data:VolunteeringHours){
    return this.http.post(`${this.apiUrl}/VolunteeringTimesheet/AddVolunteeringHours`,data);
  }
  UpdateVolunteeringHours(data:VolunteeringHours){
    return this.http.post(`${this.apiUrl}/VolunteeringTimesheet/UpdateVolunteeringHours`,data);
  }
  DeleteVolunteeringHours(id:any){
    return this.http.delete(`${this.apiUrl}/VolunteeringTimesheet/DeleteVolunteeringHours/${id}`);
  }

  //Volunteering Timesheet Goals
  GetVolunteeringGoalsList(userid:any):Observable<VolunteeringGoals[]>{
    return this.http.get<VolunteeringGoals[]>(`${this.apiUrl}/VolunteeringTimesheet/GetVolunteeringGoalsList/${userid}`);
  }
  GetVolunteeringGoalsById(id:number):Observable<VolunteeringGoals[]>{
    return this.http.get<VolunteeringGoals[]>(`${this.apiUrl}/VolunteeringTimesheet/GetVolunteeringGoalsListById/${id}`);
  }

  AddVolunteeringGoals(data:VolunteeringGoals){
    return this.http.post(`${this.apiUrl}/VolunteeringTimesheet/AddVolunteeringGoals`,data);
  }
  UpdateVolunteeringGoals(data:VolunteeringGoals){
    return this.http.post(`${this.apiUrl}/VolunteeringTimesheet/UpdateVolunteeringGoals`,data);
  }
  DeleteVolunteeringGoals(id:any){
    return this.http.delete(`${this.apiUrl}/VolunteeringTimesheet/DeleteVolunteeringGoals/${id}`);
  }


  //Mission Comment
  AddMissionComment(data:any)
  {
    return this.http.post(`${this.apiUrl}/ClientMission/AddMissionComment`,data);
  }
  MissionCommentListByMissionId(missionId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/ClientMission/MissionCommentListByMissionId/${missionId}`);
  }


  //Mission Favourite
  AddMissionFavourite(data:any){
      return this.http.post(`${this.apiUrl}/ClientMission/AddMissionFavourite`,data);
  }
  RemoveMissionFavourite(data:any){
    return this.http.post(`${this.apiUrl}/ClientMission/RemoveMissionFavourite`,data);
  }

  //Mission Rating
  MissionRating(data:any){
    return this.http.post(`${this.apiUrl}/ClientMission/MissionRating`,data);
  }

  //Mission Recent VolunteerList
  RecentVolunteerList(data:any){
    return this.http.post(`${this.apiUrl}/ClientMission/RecentVolunteerList`,data);
  }

  //ShareOrInviteMission
  GetUserList(userId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/ClientMission/GetUserList/${userId}`);
  }
  SendInviteMissionMail(data:any){debugger;
    return this.http.post(`${this.apiUrl}/ClientMission/SendInviteMissionMail`,data);
  }
}
