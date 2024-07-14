import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionthemeComponent } from './missiontheme.component';

describe('MissionthemeComponent', () => {
  let component: MissionthemeComponent;
  let fixture: ComponentFixture<MissionthemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionthemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
