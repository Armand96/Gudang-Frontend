import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangmasukComponent } from './barangmasuk.component';

describe('BarangmasukComponent', () => {
  let component: BarangmasukComponent;
  let fixture: ComponentFixture<BarangmasukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangmasukComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangmasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
