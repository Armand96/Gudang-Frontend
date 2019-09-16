import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsalbarangComponent } from './asalbarang.component';

describe('AsalbarangComponent', () => {
  let component: AsalbarangComponent;
  let fixture: ComponentFixture<AsalbarangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsalbarangComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsalbarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
