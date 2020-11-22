import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTargetOrFeatureComponent } from './new-target-or-feature.component';

describe('NewTargetOrFeatureComponent', () => {
  let component: NewTargetOrFeatureComponent;
  let fixture: ComponentFixture<NewTargetOrFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTargetOrFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTargetOrFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
