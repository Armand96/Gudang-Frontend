import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KodepekerjaaneditComponent } from './kodepekerjaanedit.component';

describe('KodepekerjaaneditComponent', () => {
  let component: KodepekerjaaneditComponent;
  let fixture: ComponentFixture<KodepekerjaaneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KodepekerjaaneditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KodepekerjaaneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
