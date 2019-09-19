import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangkeluarprintComponent } from './barangkeluarprint.component';

describe('BarangkeluarprintComponent', () => {
  let component: BarangkeluarprintComponent;
  let fixture: ComponentFixture<BarangkeluarprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangkeluarprintComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangkeluarprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
