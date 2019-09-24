import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KodepekerjaanlistComponent } from './kodepekerjaanlist.component';

describe('KodepekerjaanlistComponent', () => {
  let component: KodepekerjaanlistComponent;
  let fixture: ComponentFixture<KodepekerjaanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KodepekerjaanlistComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KodepekerjaanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
