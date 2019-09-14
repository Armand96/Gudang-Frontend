import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangkeluarcreateComponent } from './barangkeluarcreate.component';

describe('BarangkeluarcreateComponent', () => {
  let component: BarangkeluarcreateComponent;
  let fixture: ComponentFixture<BarangkeluarcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangkeluarcreateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangkeluarcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
