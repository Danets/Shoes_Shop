import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetVelocityComponent } from './widget-velocity.component';

describe('WidgetVelocityComponent', () => {
  let component: WidgetVelocityComponent;
  let fixture: ComponentFixture<WidgetVelocityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetVelocityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
