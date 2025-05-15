import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KugelComponent } from './kugel.component';

describe('KugelComponent', () => {
  let component: KugelComponent;
  let fixture: ComponentFixture<KugelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KugelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KugelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
