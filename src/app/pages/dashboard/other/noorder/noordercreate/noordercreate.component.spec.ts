import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoordercreateComponent } from './noordercreate.component';

describe('NoordercreateComponent', () => {
  let component: NoordercreateComponent;
  let fixture: ComponentFixture<NoordercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoordercreateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoordercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
