import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { StatistickService } from '../service/statistick.service';
import { LoginService } from '../service/login.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/dataviz.js";


am4core.useTheme(am4themes_animated);
declare var $: any;




@Component({
  selector: 'app-statistick-table',
  templateUrl: './statistick-table.component.html',
  styleUrls: ['./statistick-table.component.css']
})
export class StatistickTableComponent implements OnInit {

  private chart: am4charts.XYChart;
  bool_graph = false;
  modal_spinner = false;
  backtest_id: any;
  listBacktestId: any;
  statistickTable: any;

  code_graph: any;
  data_graph: any;
  data_graph_param: any;
  column_name: any;

  displayedColumns: string[] = ['code', 'period', 'trading_logic', 'reverse_logic', 'side', 'total_profit', 'average_profit',
    'average_loss', 'probability_profit', 'pf', 'probability_loss', 'quantity_of_trades', 'std', 'max_dd', 'time_filter', 'vola_filter', 'start_time',
    'end_time', 'atr_window', 'decil_window', 'vola_filter_side', 'vola_filter_value', 'take_profit', 'middle_line_window',
    'stop_loss', 'new_volume', 'step_size', 'step_quantity', 'hard_stop_loss', 'zero_line', 'candles'];
  dataTable = [];



  dataSource = new MatTableDataSource(this.dataTable);

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private statistick: StatistickService,
    private logIn: LoginService,
    public dialog: MatDialog,
    private zone: NgZone
  ) { }

  selectBacktestId() {
    this.statistick.selectBacktestId(this.logIn.user_id, this.backtest_id).subscribe(res => {
      this.statistick.getStatistickTable(this.backtest_id).subscribe(res => {
        this.dataTable = JSON.parse(res);
        this.dataSource = new MatTableDataSource(this.dataTable);
        this.dataSource.sort = this.sort;
      });
    });
  }
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: this.column_name,
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data = this.dataTable, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
  }

  openGraphModal(row) {
    $('#graph_statistick').modal('show')
    this.modal_spinner = true
    this.data_graph = null
    this.amCharts()
    this.statistick.getGraphOpen(this.backtest_id, row.code).subscribe(res => {
      this.data_graph = JSON.parse(res) ? JSON.parse(res) : null;
      this.amCharts()
      this.modal_spinner = false
    });
  }

  amCharts() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv_statistick", am4charts.XYChart);
      chart.paddingRight = 20;
      chart.data = this.data_graph;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-ddTHH:mm:ss.SSS"

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;
      dateAxis.tooltipDateFormat = "yyyy-MM-dd  HH:mm";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "eq_nav";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"

      series.tooltip.pointerOrientation = "vertical";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;
    });
  }



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }



  ngOnInit() {
    this.statistick.getBacktestId(this.logIn.user_id).subscribe(res => {
      this.listBacktestId = JSON.parse(res);
    });
    this.statistick.getSelectBacktestId(this.logIn.user_id).subscribe(res => {
      this.backtest_id = JSON.parse(res);
      this.selectBacktestId()
    });
  }


}




