import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApisComponent } from './get-apis.component';

describe('GetApisComponent', () => {
  let component: GetApisComponent;
  let fixture: ComponentFixture<GetApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetApisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
