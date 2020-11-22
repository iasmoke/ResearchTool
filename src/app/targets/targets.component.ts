import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { TargetsService } from "../service/targets.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { LoginService } from "../service/login.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, interval, observable, timer } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import "rxjs/add/operator/takeWhile";
declare var $: any;

@Component({
  selector: "app-targets",
  templateUrl: "./targets.component.html",
  styleUrls: ["./targets.component.css"]
})
export class TargetsComponent implements OnInit {
  file_py: any;
  read_open = false;
  target_new: any;
  target_array: any;
  map_target_array: any;
  file_json: any;

  value_date = "YYYY-MM-dd";

  target_settings: any;
  target_distinct_name: any;

  target_name = "";

  def_target = false;

  newTarget = {
    target_name: "",
    description: "",
    parameter: [
      {
        parameter_name: "",
        variable_name: "",
        start_value: "",
        end_value: "",
        step_value: "",
        type: "",
        file_name: String
      }
    ]
  };
  targetArray = [
    {
      target_name: String,
      parameter_name: String,
      value_name: String,
      start_value: Number,
      stop_value: Number,
      step_value: Number,
      type: String,
      select_type: true
    }
  ];

  targetArrayName: any;

  user_id = this.logIn.user_id;

  isHidden = this.logIn.user_name_title !== "test_2" ? false : true;

  file_read: {};

  FileForm: FormGroup;

  @ViewChild("File", { static: false }) InputFile;

  UploadFile: File;

  file_name: any;
  UploadProgress: any;
  target_error: any;

  constructor(
    private targetsService: TargetsService,
    private http: HttpClient,
    private fb: FormBuilder,
    private logIn: LoginService,
    private _sanitizer: DomSanitizer
  ) {
    this.targetsService.getTargets(this.logIn.user_id).subscribe(res => {
      console.log(res);
      this.targetArrayName = JSON.parse(res);
    });
  }

  textFile: any;
  // selectTarget() {
  //   this.targetsService.targetSelect(this.logIn.user_id, this.target_name).subscribe(res => {
  //     console.log(JSON.parse(res));
  //   });
  // }

  ChangeTargetSet() {
    this.targetsService
      .targetSetAdd(this.logIn.user_id, this.target_name)
      .subscribe(res => {
        console.log(res);
      });
  }

  RemoveTarget(index) {
    this.newTarget.parameter.splice(index, 1);
    console.log(index);
  }

  addParameterTarget() {
    this.newTarget.parameter.push({
      parameter_name: "",
      variable_name: "",
      start_value: "",
      end_value: "",
      step_value: "",
      type: "",
      file_name: String
    });
  }

  UpdateTargetSet(row_targetSettings) {
    this.targetsService
      .targetUpdateSet(
        this.logIn.user_id,
        this.target_name,
        row_targetSettings.parameter_name,
        row_targetSettings.value_name,
        row_targetSettings.start_value,
        row_targetSettings.stop_value,
        row_targetSettings.step_value,
        row_targetSettings.type
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  upload() {
    const file = this.InputFile.nativeElement;
    if (file.files && file.files[0]) {
      this.UploadFile = file.files[0];
    }

    const python = $("#file")
      .val()
      .toString();
    const exts = ["py"];
    // split file name at dot
    let get_ext = python.split(".");
    // reverse name to check extension
    get_ext = get_ext.reverse();
    if (python.length > 0) {
      if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
        const reader = new FileReader();
        reader.readAsDataURL($('input[type="file"]').prop("files")[0]);
        let pyString = "";
        reader.onload = () => {
          pyString = reader.result.toString();
          this.file_py = pyString;
          this.targetsService
            .addTarget(
              this.newTarget,
              this.UploadFile.name,
              this.logIn.user_id,
              this.file_py,
              this.def_target
            )
            .subscribe(res => {
              console.log(res);
              this.target_error = JSON.parse(res).toString();
              console.log(this.target_error);
              if (this.target_error === "Target added successfully") {
                $(".create-target").modal("hide");
                this.targetsService
                  .getTargets(this.logIn.user_id)
                  .subscribe(res => {
                    this.targetArray = JSON.parse(res);
                    console.log(this.targetArray);
                  });
                $("#myModalError_target").modal("show");
                this.target_error = JSON.parse(res).toString();
                setTimeout(function () {
                  $("#myModalError_target").modal("hide");
                }, 2000);
                this.newTarget = {
                  target_name: "",
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
                this.FileForm.value.File = "";
                this.targetsService
                  .getTargets(this.logIn.user_id)
                  .subscribe(res => {
                    console.log(res);
                    this.targetArrayName = JSON.parse(res);
                  });
              }
            });
        };
      }
    }
  }
  selectSettingsTarget() {
    this.targetsService
      .targetSetSelectSettings(this.logIn.user_id)
      .subscribe(res => {
        this.target_settings = JSON.parse(res)["res"];
        this.textFile = JSON.parse(res)["file"];
        console.log(this.target_settings);
      });
  }

  autoFill() {
    const file = this.InputFile.nativeElement;
    if (file.files && file.files[0]) {
      this.UploadFile = file.files[0];
    }
    const auto_fill = new FormData();
    auto_fill.append("user_id", this.logIn.user_id);
    auto_fill.append("name", file.name);
    auto_fill.append("file", this.UploadFile);
    this.targetsService.autoFillFile(auto_fill).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.UploadProgress = Math.round((event.loaded / event.total) * 100);
        console.log(this.UploadProgress);
      } else if (event.type === HttpEventType.Response) {
        let response: any;
        response = event.body;
        console.log(response);
        this.target_new = response.name;
        console.log(this.target_new);
        this.targetsService.autoFill(this.target_new).subscribe(res => {
          console.log(res);
          this.target_array = JSON.parse(res);
          console.log(this.target_array);
          // this.newTarget['target_name'].push()
          console.log(this.target_array);
          this.target_new = this.target_array.map(row => {
            console.log(row);
            this.newTarget = row;
          });
          console.log(this.newTarget);

          // this.newTarget['description'] = this.target_array[0].description
          // this.newTarget = this.target_array[0].parameter[0]
        });
      }
    });
  }

  readPy() {
    const file = this.InputFile.nativeElement;

    if (file.files && file.files[0]) {
      this.UploadFile = file.files[0];
    }
    var reader = new FileReader();

    reader.onload = () => {
      this.file_read = reader.result;
    };
    reader.readAsText(this.UploadFile);
    this.read_open = !this.read_open;
  }

  ngOnInit() {
    this.targetsService.targetGetSelect(this.logIn.user_id).subscribe(res => {
      console.log(res);
      this.target_name = JSON.parse(res);
    });

    this.FileForm = this.fb.group({FileName: ["",Validators.compose([ Validators.required,Validators.minLength(4), Validators.maxLength(1500)])],
      File: [""]
    });
  }
}
// Загрузка фото
// ValidateImage() {
//   const python = $('#file').val().toString();
//   const exts = ['py'];
//   // split file name at dot
//   let get_ext = python.split('.');
//   // reverse name to check extension
//   get_ext = get_ext.reverse();
//   if (python.length > 0) {
//     if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
//       // $(event.target).prop('disabled', false);
//       const reader = new FileReader();
//       reader.readAsDataURL($('input[type="file"]').prop('files')[0]);
//       let logoString = '';
//       reader.onload = () => {
//         logoString = reader.result.toString();
//       };
//       reader.onerror = function(error) {
//         console.log('Error: ', error);
//       };
//     }
//   }
// }
// загрузка файла в директорию
// const formData = new FormData();
// formData.append('user_id', this.logIn.user_id);
// formData.append('name', file.name);
// formData.append('file', this.UploadFile);
// this.file_name = (this.logIn.user_id + "_" + this.UploadFile.name);
// this.targetsService.autoFillFile(auto_fill).subscribe(
//   event => {
//     if (event.type === HttpEventType.UploadProgress) {
//       this.UploadProgress = Math.round((event.loaded / event.total) * 100);
//       console.log(this.UploadProgress);
//     } else if (event.type === HttpEventType.Response) {
//       let response: any;
//       response = event.body;
//       console.log(response);
