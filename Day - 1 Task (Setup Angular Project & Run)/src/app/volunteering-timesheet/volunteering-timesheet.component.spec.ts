import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringTimesheetComponent } from './volunteering-timesheet.component';

describe('VolunteeringTimesheetComponent', () => {
  let component: VolunteeringTimesheetComponent;
  let fixture: ComponentFixture<VolunteeringTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteeringTimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteeringTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
