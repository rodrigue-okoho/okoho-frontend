import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityCenterComponent } from './accessibility-center.component';

describe('AccessibilityCenterComponent', () => {
  let component: AccessibilityCenterComponent;
  let fixture: ComponentFixture<AccessibilityCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessibilityCenterComponent]
    });
    fixture = TestBed.createComponent(AccessibilityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
