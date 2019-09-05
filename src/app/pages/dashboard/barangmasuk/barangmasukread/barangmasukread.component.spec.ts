import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangmasukreadComponent } from './barangmasukread.component';

describe('BarangmasukreadComponent', () => {
  let component: BarangmasukreadComponent;
  let fixture: ComponentFixture<BarangmasukreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangmasukreadComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangmasukreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
