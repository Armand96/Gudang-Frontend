import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangmasukprintComponent } from './barangmasukprint.component';

describe('BarangmasukprintComponent', () => {
  let component: BarangmasukprintComponent;
  let fixture: ComponentFixture<BarangmasukprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangmasukprintComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangmasukprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
