import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCircleComponent } from './load-circle.component';

describe('LoadCircleComponent', () => {
  let component: LoadCircleComponent;
  let fixture: ComponentFixture<LoadCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadCircleComponent]
    });
    fixture = TestBed.createComponent(LoadCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
