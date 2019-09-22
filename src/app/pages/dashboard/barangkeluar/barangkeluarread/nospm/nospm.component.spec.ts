import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NospmComponent } from './nospm.component';

describe('NospmComponent', () => {
  let component: NospmComponent;
  let fixture: ComponentFixture<NospmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NospmComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NospmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
