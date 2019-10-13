import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspreadComponent } from './sspread.component';

describe('SspreadComponent', () => {
  let component: SspreadComponent;
  let fixture: ComponentFixture<SspreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspreadComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
