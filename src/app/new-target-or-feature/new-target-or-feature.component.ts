import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-target-or-feature',
  templateUrl: './new-target-or-feature.component.html',
  styleUrls: ['./new-target-or-feature.component.css']
})
export class NewTargetOrFeatureComponent implements OnInit {
  parameter =[{

    parameterName: '',
    parameterNameText: '',
    variableName: '',
    variableNameText: '',
    fromValue : 1,
    toValue: 2,
    stepValue: 3
  }];
  constructor() { }

  ngOnInit() {
  }
  addParameter(){
    this.parameter.push({
      
      
      parameterName: '',
      parameterNameText: '',
      variableName: '',
      variableNameText: '',
      fromValue : 1,
      toValue: 2,
      stepValue: 3
      })
    console.log(this.parameter)
  }

  removeParameter(index){
    this.parameter.splice(index, 1)
    console.log(this.parameter);
  }
  
}
