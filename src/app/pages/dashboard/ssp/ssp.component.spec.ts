import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspComponent } from './ssp.component';

describe('SspComponent', () => {
  let component: SspComponent;
  let fixture: ComponentFixture<SspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
