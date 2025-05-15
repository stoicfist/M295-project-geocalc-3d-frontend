import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaderComponent } from './quader.component';

describe('QuaderComponent', () => {
  let component: QuaderComponent;
  let fixture: ComponentFixture<QuaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
