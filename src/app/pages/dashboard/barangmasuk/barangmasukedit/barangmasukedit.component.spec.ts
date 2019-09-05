import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangmasukeditComponent } from './barangmasukedit.component';

describe('BarangmasukeditComponent', () => {
  let component: BarangmasukeditComponent;
  let fixture: ComponentFixture<BarangmasukeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangmasukeditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangmasukeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
