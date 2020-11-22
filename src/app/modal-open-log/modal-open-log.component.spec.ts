import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpenLogComponent } from './modal-open-log.component';

describe('ModalOpenLogComponent', () => {
  let component: ModalOpenLogComponent;
  let fixture: ComponentFixture<ModalOpenLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOpenLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpenLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
