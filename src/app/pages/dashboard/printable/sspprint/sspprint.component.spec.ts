import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspprintComponent } from './sspprint.component';

describe('SspprintComponent', () => {
  let component: SspprintComponent;
  let fixture: ComponentFixture<SspprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspprintComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
