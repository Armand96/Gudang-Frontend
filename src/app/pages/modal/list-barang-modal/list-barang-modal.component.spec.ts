import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarangModalComponent } from './list-barang-modal.component';

describe('ListBarangModalComponent', () => {
  let component: ListBarangModalComponent;
  let fixture: ComponentFixture<ListBarangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBarangModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBarangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
