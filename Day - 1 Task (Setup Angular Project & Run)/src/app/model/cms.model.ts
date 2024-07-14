export class CMS{
  id:number=0;
  title:string='';
  description:string='';
  slug:string='';
  status:string='';
}


export class Mission{
  id:number=0;
  missionTitle:string='';
  missionDescription:string='';
  missionOrganisationName:string='';
  missionOrganisationDetail:string='';
  countryId:number=0;
  countryName:string='';
  cityId:number=0;
  cityName:string='';
  startDate:any;
  endDate:any;
  missionType:any;
  totalSheets:any;
  registrationDeadLine:any;
  missionThemeId:any;
  missionSkillId:any;
  missionImages:any;
  missionDocuments:any;
  missionAvilability:string='';
  misssionVideoUrl:string='';
  missionThemeName:string='';
  missionSkillName:string='';
  missionStatus:string='';
  missionApplyStatus:string='';
  missionDateStatus:any;
  missionDeadLineStatus:any;
  missionFavouriteStatus:any;
  rating:any;
}


export class Country {
  id:number=0;
  countryName:string='';
}

export class City {
  id:number=0;
  countryId:number=0;
  cityName:string='';
}
