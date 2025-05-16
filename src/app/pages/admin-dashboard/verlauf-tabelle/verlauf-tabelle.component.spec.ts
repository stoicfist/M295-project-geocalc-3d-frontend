import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlaufTabelleComponent } from './verlauf-tabelle.component';

describe('VerlaufTabelleComponent', () => {
  let component: VerlaufTabelleComponent;
  let fixture: ComponentFixture<VerlaufTabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerlaufTabelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerlaufTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
