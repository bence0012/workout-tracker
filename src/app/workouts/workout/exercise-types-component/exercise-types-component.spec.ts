import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypesComponent } from './exercise-types-component';

describe('ExerciseTypesComponent', () => {
  let component: ExerciseTypesComponent;
  let fixture: ComponentFixture<ExerciseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseTypesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
