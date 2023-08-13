import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesTableComponent } from './groupes-table.component';

describe('GroupesTableComponent', () => {
  let component: GroupesTableComponent;
  let fixture: ComponentFixture<GroupesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
