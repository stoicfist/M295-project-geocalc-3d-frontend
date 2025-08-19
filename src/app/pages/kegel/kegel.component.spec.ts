import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegelComponent } from './kegel.component';

describe('KegelComponent', () => {
  let component: KegelComponent;
  let fixture: ComponentFixture<KegelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KegelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KegelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
