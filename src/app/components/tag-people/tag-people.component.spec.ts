import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPeopleComponent } from './tag-people.component';

describe('TagPeopleComponent', () => {
  let component: TagPeopleComponent;
  let fixture: ComponentFixture<TagPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
