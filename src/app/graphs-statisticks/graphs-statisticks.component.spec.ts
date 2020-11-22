import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsStatisticksComponent } from './graphs-statisticks.component';

describe('GraphsStatisticksComponent', () => {
  let component: GraphsStatisticksComponent;
  let fixture: ComponentFixture<GraphsStatisticksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsStatisticksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsStatisticksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
