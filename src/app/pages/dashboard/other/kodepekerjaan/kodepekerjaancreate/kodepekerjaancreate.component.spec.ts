import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KodepekerjaancreateComponent } from './kodepekerjaancreate.component';

describe('KodepekerjaancreateComponent', () => {
  let component: KodepekerjaancreateComponent;
  let fixture: ComponentFixture<KodepekerjaancreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KodepekerjaancreateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KodepekerjaancreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
