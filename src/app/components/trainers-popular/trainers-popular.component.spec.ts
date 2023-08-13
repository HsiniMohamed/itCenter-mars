import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersPopularComponent } from './trainers-popular.component';

describe('TrainersPopularComponent', () => {
  let component: TrainersPopularComponent;
  let fixture: ComponentFixture<TrainersPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
