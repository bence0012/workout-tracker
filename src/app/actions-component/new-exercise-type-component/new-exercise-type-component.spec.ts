import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExerciseTypeComponent } from './new-exercise-type-component';

describe('NewExerciseTypeComponent', () => {
  let component: NewExerciseTypeComponent;
  let fixture: ComponentFixture<NewExerciseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExerciseTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewExerciseTypeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
