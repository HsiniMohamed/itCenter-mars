import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayParentsComponent } from './display-parents.component';

describe('DisplayParentsComponent', () => {
  let component: DisplayParentsComponent;
  let fixture: ComponentFixture<DisplayParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
