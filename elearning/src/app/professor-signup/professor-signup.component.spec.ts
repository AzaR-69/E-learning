import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSignupComponent } from './professor-signup.component';

describe('ProfessorSignupComponent', () => {
  let component: ProfessorSignupComponent;
  let fixture: ComponentFixture<ProfessorSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
