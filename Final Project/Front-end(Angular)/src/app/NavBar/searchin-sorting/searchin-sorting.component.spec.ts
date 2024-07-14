import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchinSortingComponent } from './searchin-sorting.component';

describe('SearchinSortingComponent', () => {
  let component: SearchinSortingComponent;
  let fixture: ComponentFixture<SearchinSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchinSortingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchinSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
