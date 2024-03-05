import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasComponent } from './cartas.component';

describe('CartasComponent', () => {
  let component: CartasComponent;
  let fixture: ComponentFixture<CartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasComponent]
    });
    fixture = TestBed.createComponent(CartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
