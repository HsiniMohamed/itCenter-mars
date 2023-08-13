import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPopularComponent } from './courses-popular.component';

describe('CoursesPopularComponent', () => {
  let component: CoursesPopularComponent;
  let fixture: ComponentFixture<CoursesPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
