import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradingSetting } from '../service/trading_setting.service';
import { SpreadService } from '../service/spread.service';
import { LoginService } from '../service/login.service';
import { TradingLogicService } from '../service/trading-logic.service';
import { TimerService } from '../service/timer.service';
import { Observable, interval, observable, timer } from 'rxjs';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile'
import * as rxjs from 'rxjs';
import { delay } from 'q';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
declare var $: any;



@Component({
  selector: 'app-trading-settings',
  templateUrl: './trading-settings.component.html',
  styleUrls: ['./trading-settings.component.css']
})
export class TradingSettingsComponent implements OnInit {


  user_id = this.logIn.user_id;

  threadsError:any;

  parameter_value: any;

  trading_logic_2: any;
  trading_logic_3: any;
  trading_logic_4: any;
  trading_logic_5: any;
  trading_logic_6: any;
  trading_logic_7: any;

  threads:any;
  time_filter_resample: boolean;
  straight_logic: boolean;
  reversed_logic: boolean;
  use_time_filter: boolean;
  use_vola_filter: boolean;

  system_to_use_1: boolean;
  system_to_use_2: boolean;
  system_to_use_3: boolean;
  system_to_use_4: boolean;
  system_to_use_5: boolean;
  system_to_use_6: boolean;
  system_to_use_7: boolean;

  start_deposit_bool = false;

  submitted = false;
  
  start_deposit = this.getSetting('start_deposit');
  periods_number= this.getSetting('periods_number');
  min_pf_to_filter= this.getSetting('min_pf_to_filter');
  min_trade_quantity= this.getSetting('min_trade_quantity');
  commission_per_lot= this.getSetting('commission_per_lot');
  volume_per_lot= this.getSetting('volume_per_lot');
  max_dd_filter= this.getSetting('max_dd_filter');
  vola_filter_value= this.getSetting('vola_filter_value');
  window_decil= this.getSetting('window_decil');
  window_atr= this.getSetting('window_atr');

  vola_filter_side: any;
  resample_timeframe: any;

  optionMain: any;
  data: any;

  
  spread = [];

  backtest: any;

    
 Form1:FormGroup
  
  constructor(
    public tradingSetting: TradingSetting,
    private spreadService: SpreadService,
    private logIn: LoginService,
    private tradingLogic: TradingLogicService,
    private http: HttpClient,
    private timer: TimerService,
    private formBuilder: FormBuilder,
  ) {

    this.spreadService.getSpread(this.logIn.user_id).subscribe(res => {
      console.log(res)
      this.spread = JSON.parse(res);
      console.log(this.spread);
    });


    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 2).subscribe(res => {
      this.trading_logic_2 = JSON.parse(res);
      console.log(this.trading_logic_2);

    });

    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 3).subscribe(res => {
      this.trading_logic_3 = JSON.parse(res);
      console.log(this.trading_logic_3);
    });

    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 4).subscribe(res => {
      this.trading_logic_4 = JSON.parse(res);
      console.log(this.trading_logic_4);
      Math.round(this.trading_logic_4.value)
    });

    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 5).subscribe(res => {
      this.trading_logic_5 = JSON.parse(res);
      console.log(this.trading_logic_5);
    });

    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 6).subscribe(res => {
      this.trading_logic_6 = JSON.parse(res);
      console.log(this.trading_logic_6);
      if(this.trading_logic_6.type === 'int'){
        Math.round(this.trading_logic_6.value)
      }
    });

    this.tradingLogic.tradingLogicGet(this.logIn.user_id, 7).subscribe(res => {
      this.trading_logic_7 = JSON.parse(res);
      console.log(this.trading_logic_7);
      Math.round(this.trading_logic_7.value)
    });

  }

  tradingLogicUpdate2(trading_logic_2_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_2_row.value, this.logIn.user_id, trading_logic_2_row.value_name, 2).subscribe(res => {
      console.log(res);

    });
  }

  tradingLogicUpdate3(trading_logic_3_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_3_row.value, this.logIn.user_id, trading_logic_3_row.value_name, 3).subscribe(res => {
      console.log(res);

    });
  }

  tradingLogicUpdate4(trading_logic_4_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_4_row.value, this.logIn.user_id, trading_logic_4_row.value_name, 4).subscribe(res => {
      console.log(res);

    });
  }

  tradingLogicUpdate5(trading_logic_5_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_5_row.value, this.logIn.user_id, trading_logic_5_row.value_name, 5).subscribe(res => {
      console.log(res);

    });
  }

  tradingLogicUpdate6(trading_logic_6_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_6_row.value, this.logIn.user_id, trading_logic_6_row.value_name, 6).subscribe(res => {
      console.log(res);

    });
  }

  tradingLogicUpdate7(trading_logic_7_row) {
    this.tradingLogic.tradingLogicUpdate(trading_logic_7_row.value, this.logIn.user_id, trading_logic_7_row.value_name, 7).subscribe(res => {
      console.log(res);
    });
  }

  changeSetting(name, value) {
    this.tradingSetting.tradingChange(this.logIn.user_id, name, value).subscribe(res => { 
    });
    this.tradingSetting.valueStart_deposit = this.start_deposit
    this.tradingSetting.valuePeriods_number = this.periods_number
    this.tradingSetting.valueMin_pf_to_filter = this.min_pf_to_filter
    this.tradingSetting.valueMin_trade_quantity = this.min_trade_quantity
    this.tradingSetting.valueCommission_per_lot = this.commission_per_lot
    this.tradingSetting.valueVolume_per_lot = this.volume_per_lot
    this.tradingSetting.valueMax_dd_filter = this.max_dd_filter
    this.tradingSetting.valueVola_filter_value = this.vola_filter_value
    this.tradingSetting.valueWindow_decil = this.window_decil
    this.tradingSetting.valueWindow_atr = this.window_atr
    this.tradingSetting.valueUse_vola_filter = this.use_vola_filter
  }

  getSetting(name) {
    this.tradingSetting.getTradingSetting(this.logIn.user_id, name).subscribe(res => {
      if (JSON.parse(res)['parameter_value'] === 'true' || JSON.parse(res)['parameter_value'] === 'false') {
        this[name] = JSON.parse(res)['parameter_value'] === 'true' ? true : false;
      } else {
       this[name] = String(JSON.parse(res)['parameter_value'])
      }
    this.tradingSetting.valueStart_deposit = this.start_deposit
    this.tradingSetting.valuePeriods_number = this.periods_number
    this.tradingSetting.valueMin_pf_to_filter = this.min_pf_to_filter
    this.tradingSetting.valueMin_trade_quantity = this.min_trade_quantity
    this.tradingSetting.valueCommission_per_lot = this.commission_per_lot
    this.tradingSetting.valueVolume_per_lot = this.volume_per_lot
    this.tradingSetting.valueMax_dd_filter = this.max_dd_filter
    this.tradingSetting.valueVola_filter_value = this.vola_filter_value
    this.tradingSetting.valueWindow_decil = this.window_decil
    this.tradingSetting.valueWindow_atr = this.window_atr
    this.tradingSetting.valueUse_vola_filter = this.use_vola_filter
    });
  }

  spreadUpdate(i) {
    this.spreadService.spreadUpdate(this.spread[i].spread_from, this.spread[i].spread_to, this.spread[i].spread_value, this.logIn.user_id, this.spread[i].spread_name).subscribe(res => {
      console.log(res);
    });
   


  }

  addSpread(i) {
    this.spreadService.addSpread(this.logIn.user_id, this.spread[i].spread_from ,this.spread[i].spread_to ,this.spread[i].spread_value).subscribe(res => {
      console.log(res);
        this.spread = JSON.parse(res);
        console.log(this.spread);
    });
  }

  removeSpread(i) {
    this.spreadService.removeSpread(this.logIn.user_id, this.spread[i].spread_name).subscribe(res => {
      console.log(res)
      this.spread = JSON.parse(res)
        console.log(this.spread)
      });
  }

  

  // controlValid(){
  //   this.Form1 = this.formBuilder.group({
  //     startDeposit: [this.start_deposit,[Validators.required,Validators.min(100),Validators.max(1000000),Validators.pattern('[0-9]{1,7}')]],
  //     minTradeQuantity: [this.min_trade_quantity, [Validators.required,Validators.min(1),Validators.max(5000),Validators.pattern('[0-9]{1,4}')]],
  //     volumePerLot: [this.volume_per_lot,[Validators.required,Validators.min(1),Validators.max(1000000),Validators.pattern('[0-9]{1,7}')]],
  //     periodsNumber: [this.periods_number,[Validators.required,Validators.min(2),Validators.max(100),Validators.pattern('[0-9]{1,3}')]],
  //     minPFtoFilter: [this.min_pf_to_filter, [Validators.required,Validators.min(0),Validators.max(100.0)]],
  //     maxDDfilter: [this.max_dd_filter,[Validators.required,Validators.min(1),Validators.max(100),Validators.pattern('[0-9]{1,3}')]],
  //     commissionPerLot: [this.commission_per_lot,[Validators.required,Validators.min(0),Validators.max(1000.0)]],
  //     windowAtr:[this.window_atr,[Validators.required,Validators.min(1),Validators.max(5000),Validators.pattern('[0-9]{1,4}')]],
  //     windowDecil:[this.window_decil,[Validators.required,Validators.min(1),Validators.max(5000),Validators.pattern('[0-9]{1,4}')]],
  //     volaFilterValue:[this.vola_filter_value,[Validators.required,Validators.min(0),Validators.max(11),Validators.pattern('[0-9]{1,2}')]],
  //   });
  // }
  
  // get f() { return this.Form1.controls; }

  ngOnInit() {
    
    this.getSetting('threads')
    this.getSetting('use_time_filter');
    this.getSetting('use_vola_filter');
    this.getSetting('straight_logic');
    this.getSetting('reversed_logic')
    this.getSetting('resample_timeframe');
    this.getSetting('system_to_use_1');
    this.getSetting('system_to_use_2');
    this.getSetting('system_to_use_3');
    this.getSetting('system_to_use_4');
    this.getSetting('system_to_use_5');
    this.getSetting('system_to_use_6');
    this.getSetting('system_to_use_7');
    this.getSetting('vola_filter_side')
    this.tradingSetting.controlValid()
    this.tradingSetting.controlValidUse()
  }

}

