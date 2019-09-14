import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangkeluarComponent } from './barangkeluar.component';

describe('BarangkeluarComponent', () => {
  let component: BarangkeluarComponent;
  let fixture: ComponentFixture<BarangkeluarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangkeluarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangkeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
