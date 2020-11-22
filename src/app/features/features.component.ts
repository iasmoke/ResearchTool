import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Features } from '../service/features.service'
import { LoginService } from '../service/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
declare var $: any;




@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  read_open = false;

  feature_array: any;
  file_py: any;
  feature_name: any;
  features_set_name_get: any;
  features_set_name: any;
  def_feature = false;
  feature_new: any;

  newFeature = {
    feature_name: "",
    description: "",
    parameter: [{
      parameter_name: "",
      variable_name: "",
      start_value: "",
      end_value: "",
      step_value: "",
      type: "",
      file_name: String
    }]
  }
  isHidden = this.logIn.user_name_title !== "test_2" ? false : true;
  features_name = [];

  file_read: any;

  FileForm: FormGroup;
  @ViewChild('File_feature', { static: false }) InputFile;
  UploadFile: File;
  file_name: any;
  UploadProgress: any;

  feature_error: any;

  features_set_settings: any;

  user_id = this.logIn.user_id;
  textFile: any;

  constructor(

    private featureService: Features,
    private http: HttpClient,
    private logIn: LoginService,
    private fb: FormBuilder

  ) {
    this.featureService.getFeaturesName(this.logIn.user_id).subscribe(res => {
      console.log(res);
      this.features_name = JSON.parse(res);
    });


    this.featureService.get_feature_set_name(this.logIn.user_id).subscribe(res => {
      console.log(res);
      this.features_set_name = JSON.parse(res);
      console.log(this.features_set_name);
    });
  }

  selectFeature() {
    this.featureService.featureInsert(this.logIn.user_id, this.feature_name).subscribe(res => {
      console.log(res);
      this.featureService.get_feature_set_name(this.logIn.user_id).subscribe(res => {
        console.log(res);
        this.features_set_name = JSON.parse(res);
        console.log(this.features_set_name);
      });
    });

  }

  selectFeaturesSet() {
    this.featureService.getFeaturesSetSettings(this.logIn.user_id, this.features_set_name_get[0]).subscribe(res => {
      console.log(res);
      this.features_set_settings = JSON.parse(res)['res'];
      this.textFile = JSON.parse(res)['file']
      $("#featureSetSettings").modal('show');
    });

  }

  deleteFeaturesSet() {
    this.featureService.featureSetDelete(this.logIn.user_id, this.features_set_name_get[0]).subscribe(res => {
      console.log(res);
      $("#featureSetSettings").modal('hide');
      this.featureService.get_feature_set_name(this.logIn.user_id).subscribe(res => {
        console.log(res);
        this.features_set_name = JSON.parse(res);
        console.log(this.features_set_name);
      });
    });
  }

  UpdateFeaturesSet(row_features_set_settings) {
    this.featureService.FeaturesSetUpdate
      (
        this.logIn.user_id,
        this.features_set_name_get[0],
        row_features_set_settings.parameter_name,
        row_features_set_settings.value_name,
        row_features_set_settings.start_value,
        row_features_set_settings.stop_value,
        row_features_set_settings.step_value,
        row_features_set_settings.type
        ).subscribe(res => {
          console.log(res);
      });
  }


  RemoveFeature(index) {
    this.newFeature.parameter.splice(index, 1);
  }

  addParameterFeature() {
    this.newFeature.parameter.push({
      parameter_name: "",
      variable_name: "",
      start_value: "",
      end_value: "",
      step_value: "",
      type: "",
      file_name: String
    });
  }


  upload() {
    const File_feature = this.InputFile.nativeElement;
    if (File_feature.files && File_feature.files[0]) {
      this.UploadFile = File_feature.files[0];
    }
    const python = $('#File_feature')
      .val().
      toString();
    const exts = ['py'];
    // split file name at dot
    let get_ext = python.split('.');
    // reverse name to check extension
    get_ext = get_ext.reverse();
    if (python.length > 0) {
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
        const reader = new FileReader();
        reader.readAsDataURL($('#File_feature').prop('files')[0]);
        let pyString = '';
        reader.onload = () => {

          pyString = reader.result.toString();
          this.file_py = pyString;
          console.log(this.file_py);
          
          this.featureService
            .addFeature(
              this.newFeature,
              this.UploadFile.name,
              this.logIn.user_id,
              this.def_feature,
              this.file_py
            )
            .subscribe(res => {
              console.log(res);
              this.feature_error = JSON.parse(res);
              console.log(this.feature_error);
              if (this.feature_error === 'Feature added successfully') {
                $(".create-feature").modal("hide");
                this.featureService.getFeaturesName(this.logIn.user_id).subscribe(res => {
                  console.log(res);
                  this.features_name = JSON.parse(res);
                });
                $("#myModalError_feature").modal('show');
                setTimeout(function () {
                  $("#myModalError_feature").modal('hide');
                }, 2000);
                this.newFeature = {
                  feature_name: "",
                  description: "",
                  parameter: [{
                    parameter_name: "",
                    variable_name: "",
                    start_value: "",
                    end_value: "",
                    step_value: "",
                    type: "",
                    file_name: String
                  }]
                };
                this.InputFile.nativeElement.value = "";
                this.FileForm.value.File_feature = "";
                this.featureService
                  .getFeaturesName(this.logIn.user_id)
                  .subscribe(res => {
                    console.log(res);
                    this.features_name = JSON.parse(res);
                  });
              }
            });
          this.feature_error = undefined;
          console.log(this.feature_error);
        }
      }
    }
  }

  autoFill() {
    const File_feature = this.InputFile.nativeElement;
    if (File_feature.files && File_feature.files[0]) {
      this.UploadFile = File_feature.files[0];
    }
    const auto_fill = new FormData();
    auto_fill.append('user_id', this.logIn.user_id);
    auto_fill.append('name', File_feature.name);
    auto_fill.append('file', this.UploadFile);
    this.featureService.autoFillFile(auto_fill).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.UploadProgress = Math.round((event.loaded / event.total) * 100);
          console.log(this.UploadProgress);
        } else if (event.type === HttpEventType.Response) {
          let response: any;
          response = event.body;
          this.feature_new = response.name
          console.log(this.feature_new);
          this.featureService.autoFill(this.feature_new).subscribe(res => {
            console.log(res);
            this.feature_array = JSON.parse(res);
            console.log(this.feature_array);
            this.feature_new = this.feature_array.map(row => {
              console.log(row);
              this.newFeature = row;
            }
            )
            console.log(this.newFeature);
          });
        }
      });



  }

  readPy() {
    const File_feature = this.InputFile.nativeElement;
    if (File_feature.files && File_feature.files[0]) {
      this.UploadFile = File_feature.files[0];
    }
    var reader = new FileReader()
    reader.onload = () => {
      this.file_read = reader.result
    }
    reader.readAsText(this.UploadFile)
    this.read_open = !this.read_open;

  }

  ngOnInit() {
    this.FileForm = this.fb.group({
      'FileName': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'File_feature': [''],
    });

  }

}
