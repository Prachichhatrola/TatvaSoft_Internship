import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionskillComponent } from './missionskill.component';

describe('MissionskillComponent', () => {
  let component: MissionskillComponent;
  let fixture: ComponentFixture<MissionskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionskillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
