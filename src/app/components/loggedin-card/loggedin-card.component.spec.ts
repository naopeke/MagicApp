import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinCardComponent } from './loggedin-card.component';

describe('LoggedinCardComponent', () => {
  let component: LoggedinCardComponent;
  let fixture: ComponentFixture<LoggedinCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedinCardComponent]
    });
    fixture = TestBed.createComponent(LoggedinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
