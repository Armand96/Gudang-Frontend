import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BengkellistComponent } from './bengkellist.component';

describe('BengkellistComponent', () => {
  let component: BengkellistComponent;
  let fixture: ComponentFixture<BengkellistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BengkellistComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BengkellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
