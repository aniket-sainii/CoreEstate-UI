import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flat } from './flat';

describe('Flat', () => {
  let component: Flat;
  let fixture: ComponentFixture<Flat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flat],
    }).compileComponents();

    fixture = TestBed.createComponent(Flat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
