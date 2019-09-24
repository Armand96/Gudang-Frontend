import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoordereditComponent } from './noorderedit.component';

describe('NoordereditComponent', () => {
  let component: NoordereditComponent;
  let fixture: ComponentFixture<NoordereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoordereditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoordereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
