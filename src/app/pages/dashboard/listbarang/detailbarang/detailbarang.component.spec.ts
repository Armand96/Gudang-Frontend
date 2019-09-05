import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailbarangComponent } from './detailbarang.component';

describe('DetailbarangComponent', () => {
  let component: DetailbarangComponent;
  let fixture: ComponentFixture<DetailbarangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailbarangComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
