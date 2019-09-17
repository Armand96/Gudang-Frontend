import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomorbarangkeluarComponent } from './nomorbarangkeluar.component';

describe('NomorbarangkeluarComponent', () => {
  let component: NomorbarangkeluarComponent;
  let fixture: ComponentFixture<NomorbarangkeluarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomorbarangkeluarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomorbarangkeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
