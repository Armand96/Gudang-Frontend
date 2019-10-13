import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspcreateComponent } from './sspcreate.component';

describe('SspcreateComponent', () => {
  let component: SspcreateComponent;
  let fixture: ComponentFixture<SspcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspcreateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
