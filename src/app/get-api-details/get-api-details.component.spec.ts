import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiDetailsComponent } from './get-api-details.component';

describe('GetApiDetailsComponent', () => {
  let component: GetApiDetailsComponent;
  let fixture: ComponentFixture<GetApiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetApiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
