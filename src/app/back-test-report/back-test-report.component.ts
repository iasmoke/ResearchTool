import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPageService } from '../service/user-page.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-back-test-report',
  templateUrl: './back-test-report.component.html',
  styleUrls: ['./back-test-report.component.css']
})
export class BackTestReportComponent implements OnInit {
 
  backtest_name: string;
  backtest_id: any;
  backtest_settings: any;
  backtest_parse: any;
  backtest_settings_parse:any;


  constructor(
    private http:HttpClient,
    private userPage:UserPageService,
    private logIn:LoginService
  ) {
    
    this.userPage.backtestIdGet(this.logIn.user_id).subscribe(res => {
      console.log(res);
      this.backtest_id = JSON.parse(res);
      console.log(this.backtest_id);
    });
   }





  changeBacktestSettings() {
    this.userPage.backtestSettingsGet(this.logIn.user_id, this.backtest_name).subscribe(res => {
      console.log(res);
      
      this.backtest_settings = JSON.parse(res);
      console.log(this.backtest_settings);
      this.backtest_settings_parse = JSON.parse(this.backtest_settings);
      console.log(this.backtest_settings_parse);
      this.backtest_parse = JSON.stringify(this.backtest_settings_parse,undefined,2);
      console.log(this.backtest_parse);
      
  });
  }

  ngOnInit() {}

}