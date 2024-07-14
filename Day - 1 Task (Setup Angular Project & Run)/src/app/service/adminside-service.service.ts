import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { City, CMS, Country, Mission } from '../model/cms.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MissionApplication } from '../model/missionApplication.model';
import { MissionTheme } from '../model/missionTheme.model';
import { MissionSkill } from '../model/missionSkill.model';
@Injectable({
  providedIn: 'root',
})
export class AdminsideServiceService {
  constructor(
    public http: HttpClient,
    public toastr: ToastrService,
    public router: Router
  ) {}
  // apiUrl:string='http://localhost:63943/api';
  apiUrl: string = 'http://localhost:5140/api';
  imageUrl: string = 'http://localhost:5140';

  //User
  UserList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/AdminUser/UserDetailList`);
  }
  DeleteUser(userId: any) {
    return this.http.delete(
      `${this.apiUrl}/AdminUser/DeleteUserAndUserDetail/${userId}`
    );
  }

  //CMS
  CMSList(): Observable<CMS[]> {
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSList`);
  }
  CMSDetailById(id: number): Observable<CMS[]> {
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSDetailById/${id}`);
  }
  AddCMS(data: CMS) {
    return this.http.post(`${this.apiUrl}/CMS/AddCMS`, data, {
      responseType: 'json',
    });
  }
  UpdateCMS(data: CMS) {
    return this.http.post(`${this.apiUrl}/CMS/UpdateCMS`, data);
  }
  DeleteCMS(data: any) {
    return this.http.delete(`${this.apiUrl}/CMS/DeleteCMS/${data}`);
  }

  //Mission
  GetMissionThemeList():Observable<MissionTheme[]>{
    return this.http.get<MissionTheme[]>(`${this.apiUrl}/Mission/GetMissionThemeList`);
  }
  GetMissionSkillList():Observable<MissionSkill[]>{
    return this.http.get<MissionSkill[]>(`${this.apiUrl}/Mission/GetMissionSkillList`);
  }
  UploadImage(data: any) {
    return this.http.post(`${this.apiUrl}/Common/UploadImage`,data);
  }
  UploadDoc(data: any) {
    return this.http.post(`${this.apiUrl}/Mission/UploadImage`,data);
  }
  MissionList(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/Mission/MissionList`);
  }
  MissionDetailById(id: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(
      `${this.apiUrl}/Mission/MissionDetailById/${id}`
    );
  }
  CountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/Common/CountryList`);
  }
  CityList(countryId: any): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/Common/CityList/${countryId}`);
  }
  AddMission(data: Mission) {
    return this.http.post(`${this.apiUrl}/Mission/AddMission`, data);
  }
  UpdateMission(data: Mission) {
    return this.http.post(`${this.apiUrl}/Mission/UpdateMission`, data);
  }
  DeleteMission(data: any) {
    return this.http.delete(`${this.apiUrl}/Mission/DeleteMission/${data}`);
  }

  //Mission Application
  MissionApplicationList(): Observable<MissionApplication[]> {
    return this.http.get<MissionApplication[]>(
      `${this.apiUrl}/Mission/MissionApplicationList`
    );
  }

  MissionApplicationDelete(data: MissionApplication){
    return this.http.post(`${this.apiUrl}/Mission/MissionApplicationDelete`, data);
  }

  MissionApplicationApprove(data: MissionApplication){
    return this.http.post(`${this.apiUrl}/Mission/MissionApplicationApprove`, data);
  }

  //Mission Theme
  MissionThemeList(): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(
      `${this.apiUrl}/MissionTheme/GetMissionThemeList`
    );
  }
  MissionThemeById(id: any): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(
      `${this.apiUrl}/MissionTheme/GetMissionThemeById/${id}`
    );
  }
  AddMissionTheme(data: MissionTheme) {
    return this.http.post(`${this.apiUrl}/MissionTheme/AddMissionTheme`, data);
  }
  UpdateMissionTheme(data: MissionTheme) {
    return this.http.post(
      `${this.apiUrl}/MissionTheme/UpdateMissionTheme`,
      data
    );
  }
  DeleteMissionTheme(data: any) {
    return this.http.delete(
      `${this.apiUrl}/MissionTheme/DeleteMissionTheme/${data}`
    );
  }

  //Mission Skill
  MissionSkillList(): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(
      `${this.apiUrl}/MissionSkill/GetMissionSkillList`
    );
  }
  MissionSkillById(id: any): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(
      `${this.apiUrl}/MissionSkill/GetMissionSkillById/${id}`
    );
  }
  AddMissionSkill(data: MissionSkill) {
    return this.http.post(`${this.apiUrl}/MissionSkill/AddMissionSkill`, data);
  }
  UpdateMissionSkill(data: MissionSkill) {
    return this.http.post(
      `${this.apiUrl}/MissionSkill/UpdateMissionSkill`,
      data
    );
  }
  DeleteMissionSkill(data: any) {
    return this.http.delete(
      `${this.apiUrl}/MissionSkill/DeleteMissionSkill/${data}`
    );
  }
}
