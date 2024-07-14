import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissionSkillComponent } from './add-mission-skill.component';

describe('AddMissionSkillComponent', () => {
  let component: AddMissionSkillComponent;
  let fixture: ComponentFixture<AddMissionSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMissionSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMissionSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
