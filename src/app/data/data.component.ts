import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { LoginService } from '../service/login.service';
import { MAT_DATE_LOCALE_FACTORY, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated  from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
declare var $: any;



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
 
})
export class DataComponent implements OnInit {

  private chart: am4charts.XYChart;

  connect_true = false;
  connect_false = false;

  currencyMarket:any;
  dataTime:any;
 
  dataTimeFrame:any;
  sourceArray:any;

  minDate:any; 
  maxDate:any; 
 
  data_graph:any;

  data_type:any;
  timeframe_type: any;
 
  sources: any;
  timeframe: any;

  status_text:any;

  start_date:Date;
  end_date:Date;
  ticker:any;
  formDate:any;

  tickerArray: string[] = [];
  filteredOptions: Observable<string[]>;
  onTicker = new FormControl(this.ticker);
  mapTimeFrame:any;
  
  dataGraph = false;
  constructor(
    public dataService: DataService,
    private http: HttpClient,
    private logIn: LoginService,
    public dialog: MatDialog,
    private zone: NgZone,
    private datePipe : DatePipe
  ) {}

  selectChange1(){
    this.dataService.select1Null(this.logIn.user_id).subscribe(res => {
    });
  this.timeframe_type = null;
  this.ticker = null;
  this.sources = null;
  this.timeframe = null;
 

  }
  selectChange2(){
    this.dataService.select2Null(this.logIn.user_id).subscribe(res => {
    });
  this.ticker = null;
  this.sources = null;
  this.timeframe = null;
  

  }
  selectChange3(){
    this.dataService.select3Null(this.logIn.user_id).subscribe(res => {
    });
    this.sources = null;
    this.timeframe = null;
  }
  
  selectChange4(){
    this.dataService.select4Null(this.logIn.user_id).subscribe(res => {
    });
    this.timeframe = null;
  }
  

  changeDataType() {
    this.dataService.getTimeFrameType(this.logIn.user_id, this.data_type).subscribe(res => {
      this.dataTime = JSON.parse(res);
     
    });
  }

  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.tickerArray.filter(option => option.toLowerCase().includes(filterValue));
  }
  changeTimeFrameType() {
    this.dataService.getTicker(this.logIn.user_id, this.data_type, this.timeframe_type).subscribe(res => {
      this.tickerArray = JSON.parse(res);
    this.filteredOptions = this.onTicker.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    });
    
  }


  changeTimeFrame() {
    this.dataService.getTimeFrame(this.logIn.user_id, this.data_type, this.timeframe_type, this.ticker).subscribe(res => {
      this.sourceArray = JSON.parse(res);
    });
    
  }
  changeSource(){
    this.dataService.getSource(this.logIn.user_id, this.data_type, this.timeframe_type, this.ticker, this.sources).subscribe(res => {
      this.dataTimeFrame = JSON.parse(res);
    });
  }
  changeTime(){
    this.dataService.changeTime(this.logIn.user_id,this.timeframe).subscribe(res => {
    });
  }

  dateUpdate(name, value) {
    this.formDate = this.datePipe.transform(value, 'yyyy-MM-dd')
    this.dataService.dateUpdate(this.logIn.user_id, this.formDate, name).subscribe(res => {
    });
  }

  getDate(name) {
    this.dataService.getDate(this.logIn.user_id, name).subscribe(res => {
      this[name] = JSON.parse(res)['parameter_value'];
    });
  }

  getDateDB (){
    this.dataService.getDateDB(this.data_type, this.timeframe_type, this.ticker, this.sources, this.timeframe).subscribe(res => {
        this.minDate = JSON.parse(res)['minDate'];
        this.maxDate = JSON.parse(res)['maxDate'];
        this.start_date = JSON.parse(res)['minDate'];
        this.end_date = JSON.parse(res)['maxDate'];
        this.dateUpdate('start_date',this.start_date);
        this.dateUpdate('end_date',this.end_date);

    });
  }

  getDateTS(){
    this.dataService.getDateDB(this.data_type, this.timeframe_type, this.ticker, this.sources, this.timeframe).subscribe(res => {
      this.minDate = JSON.parse(res)['minDate'];
      this.maxDate = JSON.parse(res)['maxDate'];
    })
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  openModalGraph(){
    this.dataGraph = true;
    this.dataService.disabledOpenGraph = true;
    
    this.dataService.dataGraph( this.start_date, this.end_date,this.logIn.user_id,this.data_type, this.ticker, this.sources, this.timeframe).subscribe(res => {
      this.data_graph = JSON.parse(res);
      this.dataGraph = false;
      $('#graph_main').modal('show')

      this.zone.runOutsideAngular(() => {
        
          let chart = am4core.create("chartdiv_main", am4charts.XYChart);
          chart.data= this.data_graph
          chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
          
          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;
          dateAxis.groupData = true;
          dateAxis.groupCount = 300;
          
          dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.tooltip.disabled = true;
          
          let series = chart.series.push(new am4charts.CandlestickSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "close";
          series.dataFields.openValueY = "open";
          series.dataFields.lowValueY = "low";
          series.dataFields.highValueY = "high";
          series.simplifiedProcessing = true;
          
          chart.cursor = new am4charts.XYCursor();
         
          let lineSeries = chart.series.push(new am4charts.LineSeries());
          lineSeries.dataFields.dateX = "date";
          lineSeries.dataFields.valueY = "close";
          // need to set on default state, as initially series is "show"
          lineSeries.defaultState.properties.visible = false;
          
          // hide from legend too (in case there is one)
          lineSeries.hiddenInLegend = true;
          lineSeries.fillOpacity = 0.5;
          lineSeries.strokeOpacity = 0.5;
          
          
          let scrollbarX = new am4charts.XYChartScrollbar();
          
        })
  })
  }

  boolfunOpenGraph(){
    this.dataService.disabledOpenGraph = false;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  

  ngOnInit() {

    this.getDate('start_date');
    this.getDate('end_date');

    this.dataService.getDataType().subscribe(res => {
      this.currencyMarket = JSON.parse(res);
    });

    this.dataService.getCurrentData(this.logIn.user_id).subscribe(res => {
      const currentData = JSON.parse(res);
      this.data_type = currentData[0]['data_type'];
      if (this.data_type !== null) {
        this.changeDataType();
      }
      this.timeframe_type = currentData[0]['timeframe_type'];
      if (this.timeframe_type !== null) {
        this.changeTimeFrameType();
      }
      this.ticker = currentData[0]['ticker'];
      if (this.ticker !== null) {
        this.changeTimeFrame();
      }
      this.sources = currentData[0]['source'];
      if (this.sources !== null) {
        this.changeSource();
      }
      this.timeframe = currentData[0]['timeframe'];
      if (this.timeframe !== null) {
        this.changeTime();
      }
      if(this.timeframe !== null){
        this.getDateTS();
      }
    });
    this.dataService.statusDB().subscribe(res => {
      this.status_text = JSON.parse(res).toString()
      if(this.status_text === "influxdb online"){
      this.connect_true = true;
    }else{
      this.connect_false = true;
    }
    })
  } 
}
