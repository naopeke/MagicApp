import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventComponent } from './edit-event-2.component';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEventComponent]
    });
    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
