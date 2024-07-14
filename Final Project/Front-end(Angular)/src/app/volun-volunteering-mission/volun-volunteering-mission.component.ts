import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import * as moment from 'moment';
import { NgToastService } from 'ng-angular-popup';
import { AdminloginService } from '../service/adminlogin.service';
import { ClientService } from '../service/client.service';
declare var window:any;
@Component({
  selector: 'app-volun-volunteering-mission',
  templateUrl: './volun-volunteering-mission.component.html',
  styleUrls: ['./volun-volunteering-mission.component.css']
})
export class VolunVolunteeringMissionComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  applyModal:any;
  missionId:any;
  missionDetail:any;
  imageList:any=[];
  recentVolunteerList:any[]=[];
  missionDoc:any;
  loginUserId:number=0;
  loginUserName:any;
  btnText:any='Apply Now';
  missionCommentList:any[]=[];
  missionFavourite:boolean = false;
  favImag:string='assets/Img/heart1.png';
  favImag1:string='assets/Img/heart11.png';
  constructor(private service:ClientService,private toast:NgToastService,private activeRoute:ActivatedRoute,private router:Router,private datePipe:DatePipe,private adminservice:AdminloginService) {
    this.missionId = this.activeRoute.snapshot.paramMap.get('missionId');

   }

  ngOnInit(): void {
    this.adminservice.getCurrentUser().subscribe((data:any)=>{

      let loginUserDetail = this.adminservice.getUserDetail();
      data == null ? (this.loginUserId = loginUserDetail.userId) : (this.loginUserId = data.userId);
      data == null ? (this.loginUserName = loginUserDetail.fullName) : (this.loginUserName = data.fullName);
    });
    if(this.missionId != null)
    {
        this.FetchMissionDetail(this.missionId);
    }
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:true
      }
    ];
    this.applyModal = new window.bootstrap.Modal(
      document.getElementById('applyMissionModal')
    );
    this.RecentVolunteerList();
  }
  FetchMissionDetail(missionId:any)
  {
    let value={
      missionId:missionId,
      userId:this.loginUserId
    }
      this.service.MissionDetailByMissionId(value).subscribe((data:any)=>{
        if(data.result == 1)
        {
              this.missionDetail = data.data;

              this.imageList = this.missionDetail.missionImages.split(',');
              this.galleryImages = this.getImages();
              if(this.missionDetail.missionDocuments){
                this.missionDoc = this.service.imageUrl+'/'+this.missionDetail.missionDocuments;
              }
              this.btnText = this.missionDetail.missionApplyStatus == 'Applied' ? 'Already Apply' : 'Apply Now';
              this.MissionCommentList();
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err => this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  getImages() : NgxGalleryImage[] {
    const imageUrls : NgxGalleryImage[]=[];
    for (const photo of this.imageList) {
      imageUrls.push({
        small: this.service.imageUrl + '/' + photo.replaceAll('\\','/'),
        medium: this.service.imageUrl + '/' + photo.replaceAll('\\','/'),
        big: this.service.imageUrl + '/' + photo.replaceAll('\\','/')
      });
    }
    return imageUrls;
  }
  OpenApplyMissionModal(id:any){
    this.applyModal.show();
    this.missionId = id;
  }
  CloseApplyMissionModal(){
    this.applyModal.hide();
  }
  ApplyMission(id:any)
  {
    var tokenDetail = this.adminservice.decodedToken();
    if(tokenDetail == null || tokenDetail.userType != 'user')
    {
      this.router.navigate(['']);
    }
    else if(tokenDetail.userImage == "")
    {
        this.toast.warning({detail:"Warning",summary:"First Fillup User Profile Detail",duration:3000});
        this.router.navigate([`userProfile/${tokenDetail.userId}`])
    }
    else
    {
      let value={
        missionId:this.missionDetail.id,
        userId:this.loginUserId,
        appliedDate:moment().format("yyyy-MM-DDTHH:mm:ssZ"),
       status:false,
        sheet:1
      };
        this.service.ApplyMission(value).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.toast.success({detail:"SUCCESS",summary:data.data});
              setTimeout(() => {
                this.CloseApplyMissionModal();
                this.router.navigate(['/home']);
              }, 1000);
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }
        },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
    }
  }

  PostComment(commentdesc:any){debugger;
    var tokenDetail = this.adminservice.decodedToken();
    if(tokenDetail == null || tokenDetail.userType != 'user')
    {
      this.router.navigate(['']);
    }
    else if(tokenDetail.userImage == "")
    {
        this.toast.warning({detail:"Warning",summary:"First Fillup User Profile Detail",duration:3000});
        this.router.navigate([`userProfile/${tokenDetail.userId}`])
    }
    else
    {
      let value = {
        missionId:this.missionDetail.id,
        userId:this.loginUserId,
        CommentDescription:commentdesc,
        commentDate:moment().format("yyyy-MM-DDTHH:mm:ssZ"),

      }
      this.service.AddMissionComment(value).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          window.location.reload();
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
    }
  }
  MissionCommentList()
  {
    this.service.MissionCommentListByMissionId(this.missionDetail.id).subscribe((data:any)=>{
        if(data.result == 1)
        {
            this.missionCommentList = data.data;

            this.missionCommentList = this.missionCommentList.map(x=>{

              return {
                id:x.id,
                commentDescription:x.commentDescription,
                commentDate:x.commentDate ? this.datePipe.transform(x.commentDate,'EEEE, MMMM d, y, h:mm a') : '',
                missionId:x.missionId,
                userId:x.userId,
                userFullName:x.userFullName,
                userImage:x.userImage ? this.service.imageUrl + '/' + x.userImage : 'assets/NoImg.png'
              }
            });

            console.log(this.missionCommentList);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  MissionFavourite(missionId:any){
    var tokenDetail = this.adminservice.decodedToken();
    if(tokenDetail == null || tokenDetail.userType != 'user')
    {
      this.router.navigate(['']);
    }
    else if(tokenDetail.userImage == "")
    {
        this.toast.warning({detail:"Warning",summary:"First Fillup User Profile Detail",duration:3000});
        this.router.navigate([`userProfile/${tokenDetail.userId}`])
    }
    else
    {
      this.missionFavourite = !this.missionFavourite;
      let value = {
        missionId : missionId,
        userId : this.loginUserId
      }
      if(this.missionFavourite)
      {

          this.service.AddMissionFavourite(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.FetchMissionDetail(missionId);
          }
          else
          {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
       });
      }
      else
      {
          this.service.RemoveMissionFavourite(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.FetchMissionDetail(missionId);
          }
          else
          {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
        });
      }
    }
  }

  RecentVolunteerList()
  {
    let value = {
      missionId:this.missionId,
      userId:this.loginUserId
    }
    this.service.RecentVolunteerList(value).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.recentVolunteerList = data.data;
          this.recentVolunteerList = this.recentVolunteerList.map(x =>{
            return{
              id:x.id,
              missioId:x.missioId,
              userId:x.userId,
              userName:x.userName,
              userImage:x.userImage ? this.service.imageUrl+ '/' + x.userImage : 'assets/NoImg.png'
            }
          })
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    })
  }
}


