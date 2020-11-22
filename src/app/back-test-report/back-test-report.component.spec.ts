import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTestReportComponent } from './back-test-report.component';

describe('GarphAndTablesComponent', () => {
  let component: BackTestReportComponent;
  let fixture: ComponentFixture<BackTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
