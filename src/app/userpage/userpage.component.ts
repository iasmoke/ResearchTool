import { Component, OnInit } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { UserPageService } from '../service/user-page.service';
import { LoginService } from '../service/login.service';
declare var $: any;

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {


  targets_names: any;
  features_names: any;

  target_name: any;
  feature_name:any;

  parameter_name_target = "";
  parameter_name_feature = "";

  file_text_feature:any;
  file_text_target:any;

  parameter_target:any;
  parameter_feature:any;

  error_target:any;
  error_feature:any;
  def_target:any;
  target_name_settings:any;
  parameter_traget_description:any;
  feature_name_settings:any;
  parameter_feature_description:any;
  target_name_copy:any;
  mess_done_text:any;
  def_feature:any;

  header_target_card = true
  header_feature_card = true

  constructor(
    private http: HttpClient,
    private userPage: UserPageService,
    private logIn:LoginService
  ) {
    this.userPage.getTargets(this.logIn.user_id).subscribe(res => {
      this.targets_names = JSON.parse(res)
    });

    this.userPage.getFeatures(this.logIn.user_id).subscribe(res => {
      this.features_names = JSON.parse(res);
    });
    console.log(this.header_target_card);
    
   
  }

  changeTarget() {
    this.userPage.clickTarget(this.logIn.user_id, this.target_name).subscribe(res => {
      console.log(res);
      
      this.parameter_target = JSON.parse(res)['parameter_target'];
      this.def_target = this.parameter_target[0].def_target;
      this.parameter_name_target = this.parameter_target[0].parameter_name;
      this.file_text_target = JSON.parse(res)['file_text'];
      this.target_name_settings = JSON.parse(res)['target_name'];
      this.parameter_traget_description = JSON.parse(res)['parameter_description'];
    });
    console.log(this.header_target_card);
    
  }
  changeFeature() {
    
    this.userPage.clickFeature(this.logIn.user_id, this.feature_name).subscribe(res => {
      
      this.parameter_feature = JSON.parse(res)['parameter_feature'];
      this.parameter_name_feature = this.parameter_feature[0].parameter_name;
      this.def_feature = this.parameter_feature[0].def_feature;
      this.file_text_feature = JSON.parse(res)['file_text'];
      this.feature_name_settings = JSON.parse(res)['feature_name'];
      this.parameter_feature_description = JSON.parse(res)['parameter_description'];
    });
  }

  targetUpdate(){
    this.userPage.targetUpdate(this.logIn.user_id,this.target_name,this.parameter_target).subscribe(res => {
  
      this.error_target = JSON.parse(res)['error'].toString();
      
      $("#myModalError_target_update").modal('show');
      setTimeout(function () {
        $("#myModalError_target_update").modal('hide');
      }, 2000);
    });
  }

  featureUpdate(){
    this.userPage.featureUpdate(this.logIn.user_id,this.feature_name,this.parameter_feature).subscribe(res => {
     
      this.error_feature = JSON.parse(res)['error'].toString();
      
      $("#myModalError_feature_update").modal('show');
      setTimeout(function () {
        $("#myModalError_feature_update").modal('hide');
      }, 2000);
    });
  }

  newTargetCopy(){
    $("#copy_target").modal('show');
    this.target_name_copy = this.target_name_settings + '(copy)';
  }

  copyTarget(){
    this.userPage.copyTarget(this.logIn.user_id,this.target_name, this.target_name_copy).subscribe(res => {
      
    this.targets_names = JSON.parse(res)['target_list'];
    this.mess_done_text = JSON.parse(res)['mess']; 

    $("#copy_target").modal('hide');
    $("#mess_done").modal('show');
    setTimeout(function () {
      $("#mess_done").modal('hide');
    }, 2000);
  });
}


  ngOnInit() {

  }

}
