import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NokontrakComponent } from './nokontrak.component';

describe('NokontrakComponent', () => {
  let component: NokontrakComponent;
  let fixture: ComponentFixture<NokontrakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NokontrakComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NokontrakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
