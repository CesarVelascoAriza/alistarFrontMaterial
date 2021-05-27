import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraseComponent } from './registrase.component';

describe('RegistraseComponent', () => {
  let component: RegistraseComponent;
  let fixture: ComponentFixture<RegistraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
