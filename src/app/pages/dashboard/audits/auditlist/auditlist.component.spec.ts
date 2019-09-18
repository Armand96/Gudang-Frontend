import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlistComponent } from './auditlist.component';

describe('AuditlistComponent', () => {
  let component: AuditlistComponent;
  let fixture: ComponentFixture<AuditlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditlistComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
