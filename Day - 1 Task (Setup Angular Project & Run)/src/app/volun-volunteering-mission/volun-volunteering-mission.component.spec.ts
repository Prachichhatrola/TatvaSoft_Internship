import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunVolunteeringMissionComponent } from './volun-volunteering-mission.component';

describe('VolunVolunteeringMissionComponent', () => {
  let component: VolunVolunteeringMissionComponent;
  let fixture: ComponentFixture<VolunVolunteeringMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunVolunteeringMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunVolunteeringMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
