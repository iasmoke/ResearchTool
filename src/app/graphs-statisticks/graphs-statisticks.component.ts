import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated  from "@amcharts/amcharts4/themes/dataviz.js";
import { BacktestsService } from '../service/backtests.service';
import { StatistickService } from '../service/statistick.service';
import { LoginService } from '../service/login.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-graphs-statisticks',
  templateUrl: './graphs-statisticks.component.html',
  styleUrls: ['./graphs-statisticks.component.css']
})
export class GraphsStatisticksComponent implements OnInit {

  private chart: am4charts.XYChart;

  backtest_id:any;
  backtest_id_list:any;

  constructor(
    private backtestService:BacktestsService,
    private statistickService:StatistickService,
    private logIn:LoginService,
    private zone: NgZone
  ) { 
    this.statistickService.getBacktestId(this.logIn.user_id).subscribe(res => {
      this.backtest_id_list = JSON.parse(res);
    })
  }

  selectBacktestId(){
    this.backtestService.graphsSelectBacktestID(this.logIn.user_id,this.backtest_id).subscribe(res => {
      console.log(res);
    });
  }


  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_pf", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv_maxDD", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
     
    })
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_ap", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
     

    })
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_al", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
     

    })
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_td", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
    

    })
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_time_pf", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_time_maxDD", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_time_ap", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_time_al", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv_time_td", am4charts.XYChart);

      chart.paddingRight = 20;
      chart.data = [];
     
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      
      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
      };
      dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "eq_nav";
      series.tooltipText = "Visits: [bold]{valueY}[/]";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();

    })

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  ngOnInit() {
    if(this.backtest_id !== null){
      this.backtestService.graphsGetTypeBacktestID(this.logIn.user_id).subscribe(res => {
        this.backtest_id = JSON.parse(res);
      })
    }
  
  }

}
