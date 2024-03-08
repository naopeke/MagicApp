import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedoutCardComponent } from './loggedout-card.component';

describe('LoggedoutCardComponent', () => {
  let component: LoggedoutCardComponent;
  let fixture: ComponentFixture<LoggedoutCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedoutCardComponent]
    });
    fixture = TestBed.createComponent(LoggedoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
