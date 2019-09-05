import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbarangComponent } from './listbarang.component';

describe('ListbarangComponent', () => {
  let component: ListbarangComponent;
  let fixture: ComponentFixture<ListbarangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbarangComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
