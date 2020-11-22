import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {

  // @Output()
  // onTargetChange = new EventEmitter();
  // // @Output()
  // onFeatureChange = new EventEmitter();
  // @Output()
  // onAddFeature = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // changeTarget(target) {
  //   this.onTargetChange.emit(target);
   
  
  // selectFeature(feature){
  //   console.log(feature)
  //   this.onFeatureChange.emit(feature);
  //   };

}
