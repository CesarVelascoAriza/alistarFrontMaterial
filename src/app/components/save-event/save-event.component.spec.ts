import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEventComponent } from './save-event.component';

describe('SaveEventComponent', () => {
  let component: SaveEventComponent;
  let fixture: ComponentFixture<SaveEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
