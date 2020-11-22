import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistickTableComponent } from './statistick-table.component';

describe('StatistickTableComponent', () => {
  let component: StatistickTableComponent;
  let fixture: ComponentFixture<StatistickTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistickTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistickTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
