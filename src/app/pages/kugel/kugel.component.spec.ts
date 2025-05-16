import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KugelComponent } from './kugel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShapeService } from '../../services/shape.service';
import { of } from 'rxjs';

describe('KugelComponent', () => {
  let component: KugelComponent;
  let fixture: ComponentFixture<KugelComponent>;
  let mockShapeService: jasmine.SpyObj<ShapeService>;

  beforeEach(async () => {
    mockShapeService = jasmine.createSpyObj('ShapeService', ['calculate']);

    await TestBed.configureTestingModule({
      imports: [KugelComponent, ReactiveFormsModule],
      providers: [
        { provide: ShapeService, useValue: mockShapeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KugelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte Volumen und Oberfläche berechnen', () => {
    // Arrange: Testdaten & Mock-Antwort
    const expectedResponse = { volume: 4188.79, surface: 1256.63 };
    mockShapeService.calculate.and.returnValue(of(expectedResponse));

    // Form-Daten setzen
    component.form.setValue({ radius: 10 });

    // Act: Methode aufrufen
    component.berechnen();

    // Assert
    expect(mockShapeService.calculate).toHaveBeenCalledWith({
      shapeType: 'kugel',
      parameters: { radius: 10 }
    });
    expect(component.volume).toBe(expectedResponse.volume);
    expect(component.surface).toBe(expectedResponse.surface);
  });
});
