import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangkeluareditComponent } from './barangkeluaredit.component';

describe('BarangkeluareditComponent', () => {
  let component: BarangkeluareditComponent;
  let fixture: ComponentFixture<BarangkeluareditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarangkeluareditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangkeluareditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
