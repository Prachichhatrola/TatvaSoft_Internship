import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissionThemeComponent } from './add-mission-theme.component';

describe('AddMissionThemeComponent', () => {
  let component: AddMissionThemeComponent;
  let fixture: ComponentFixture<AddMissionThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMissionThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMissionThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
