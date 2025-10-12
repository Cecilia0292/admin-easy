import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGift } from './edit-gift';

describe('EditGift', () => {
  let component: EditGift;
  let fixture: ComponentFixture<EditGift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
