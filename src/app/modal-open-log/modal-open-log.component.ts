import { Component, OnInit, ChangeDetectionStrategy, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalLastLog } from '../app.component';
import { TradingSetting } from '../service/trading_setting.service';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-modal-open-log',
  templateUrl: './modal-open-log.component.html',
  styleUrls: ['./modal-open-log.component.css'],
})
export class ModalOpenLogComponent implements OnInit {



  log_text = this.data.log_text

  constructor(
    public dialogRef: MatDialogRef<ModalOpenLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ModalLastLog,
    ) {}

  ngOnInit() {
  }

}
