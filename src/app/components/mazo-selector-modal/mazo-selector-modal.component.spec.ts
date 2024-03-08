import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazoSelectorModalComponent } from './mazo-selector-modal.component';

describe('MazoSelectorModalComponent', () => {
  let component: MazoSelectorModalComponent;
  let fixture: ComponentFixture<MazoSelectorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MazoSelectorModalComponent]
    });
    fixture = TestBed.createComponent(MazoSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
