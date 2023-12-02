import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCenterComponent } from './security-center.component';

describe('SecurityCenterComponent', () => {
  let component: SecurityCenterComponent;
  let fixture: ComponentFixture<SecurityCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityCenterComponent]
    });
    fixture = TestBed.createComponent(SecurityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
