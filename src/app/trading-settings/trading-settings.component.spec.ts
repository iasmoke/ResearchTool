import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingSettingsComponent } from './trading-settings.component';

describe('TradingSettingsComponent', () => {
  let component: TradingSettingsComponent;
  let fixture: ComponentFixture<TradingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
