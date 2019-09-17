import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyekComponent } from './proyek.component';

describe('ProyekComponent', () => {
  let component: ProyekComponent;
  let fixture: ComponentFixture<ProyekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyekComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
