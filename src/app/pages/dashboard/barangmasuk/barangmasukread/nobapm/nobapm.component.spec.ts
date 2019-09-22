import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobapmComponent } from './nobapm.component';

describe('NobapmComponent', () => {
  let component: NobapmComponent;
  let fixture: ComponentFixture<NobapmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobapmComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobapmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
