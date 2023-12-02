import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCenterComponent } from './private-center.component';

describe('PrivateCenterComponent', () => {
  let component: PrivateCenterComponent;
  let fixture: ComponentFixture<PrivateCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateCenterComponent]
    });
    fixture = TestBed.createComponent(PrivateCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
