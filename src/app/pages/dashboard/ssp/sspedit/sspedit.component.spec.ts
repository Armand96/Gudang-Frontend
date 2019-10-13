import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspeditComponent } from './sspedit.component';

describe('SspeditComponent', () => {
  let component: SspeditComponent;
  let fixture: ComponentFixture<SspeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspeditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
