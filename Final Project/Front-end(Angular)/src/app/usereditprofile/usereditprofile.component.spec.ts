import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereditprofileComponent } from './usereditprofile.component';

describe('UsereditprofileComponent', () => {
  let component: UsereditprofileComponent;
  let fixture: ComponentFixture<UsereditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsereditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsereditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
