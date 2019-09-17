import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BengkelComponent } from './bengkel.component';

describe('BengkelComponent', () => {
  let component: BengkelComponent;
  let fixture: ComponentFixture<BengkelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BengkelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BengkelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
