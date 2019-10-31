import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BengkeleditComponent } from './bengkeledit.component';

describe('BengkeleditComponent', () => {
  let component: BengkeleditComponent;
  let fixture: ComponentFixture<BengkeleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BengkeleditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BengkeleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
