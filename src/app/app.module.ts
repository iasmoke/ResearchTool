import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { TargetsComponent } from './targets/targets.component';
import { FeaturesComponent } from './features/features.component';
import { TradingSettingsComponent } from './trading-settings/trading-settings.component';
import { BackTestReportComponent } from './back-test-report/back-test-report.component';
import { UserpageComponent } from './userpage/userpage.component';
import { PageOneComponent } from './page-one/page-one.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Features } from './service/features.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { StatistickTableComponent } from './statistick-table/statistick-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule} from '@angular/material/button'
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTreeModule} from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { ModalOpenLogComponent } from './modal-open-log/modal-open-log.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TextFieldModule} from '@angular/cdk/text-field';
import { GraphsStatisticksComponent } from './graphs-statisticks/graphs-statisticks.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DatePipe} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



 

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    TargetsComponent,
    FeaturesComponent,
    TradingSettingsComponent,
    BackTestReportComponent,
    UserpageComponent,
    PageOneComponent,
    FileSelectDirective,
    LoginComponent,
    StatistickTableComponent,
    ModalOpenLogComponent,
    GraphsStatisticksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    CdkStepperModule,
    CdkTreeModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    ScrollingModule,
    TextFieldModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [
    Features,
    MatDatepickerModule,
    DatePipe
  ],
  
  bootstrap: [AppComponent],
  
  exports: [ModalOpenLogComponent],
  
  entryComponents: [ModalOpenLogComponent]
})
export class AppModule { }
