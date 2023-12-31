import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInfosComponent } from './group-infos.component';

describe('GroupInfosComponent', () => {
  let component: GroupInfosComponent;
  let fixture: ComponentFixture<GroupInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
