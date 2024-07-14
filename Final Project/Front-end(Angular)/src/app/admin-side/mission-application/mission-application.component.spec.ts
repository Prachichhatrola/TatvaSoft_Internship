import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionApplicationComponent } from './mission-application.component';

describe('MissionApplicationComponent', () => {
  let component: MissionApplicationComponent;
  let fixture: ComponentFixture<MissionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
