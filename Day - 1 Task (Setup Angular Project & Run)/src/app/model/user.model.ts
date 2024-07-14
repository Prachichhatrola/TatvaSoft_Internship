export class user{
  id:number=0;
  firstName :string;
  lastName:string;
  phoneNumber:string;
  emailAddress:string;
  password:string;
  userType:string;
  userImage:any;
}


export class UserDetail{
  id:number=0;
  userId:number=0;
  name:string='';
  surname:string='';
  employeeId:string='';
  manager:string='';
  title:string='';
  department:string='';
  myProfile:string='';
  whyIVolunteer:string='';
  countryId:number=0;
  cityId:number=0;
  avilability:string='';
  linkdInUrl:string='';
  mySkills:any;
  userImage:string='';
  status:any;
}

export class ContactUs{
  id:number=0;
  userId:number=0;
  name:string='';
  emailAddress:string='';
  subject:string='';
  message:string='';
}

export class ChangePassword{
  id:number=0;
  userId:number=0;
  oldPassword:string='';
  newPassword:string='';
  confirmPassword:string='';
}
