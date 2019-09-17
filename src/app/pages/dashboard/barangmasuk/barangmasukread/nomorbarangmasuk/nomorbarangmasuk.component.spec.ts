import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomorbarangmasukComponent } from './nomorbarangmasuk.component';

describe('NomorbarangmasukComponent', () => {
  let component: NomorbarangmasukComponent;
  let fixture: ComponentFixture<NomorbarangmasukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomorbarangmasukComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomorbarangmasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
