import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';
import { Viewer3dComponent } from '../viewer3d/viewer3d.component';

@Component({
  selector: 'app-kegel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Viewer3dComponent
  ],
  templateUrl: './kegel.component.html',
  styleUrls: ['./kegel.component.scss']
})
export class KegelComponent {
  form: FormGroup;
  volume: number | null = null;
  surface: number | null = null;
  viewerParams: any = {};
  show3D: boolean = false;

  constructor(private fb: FormBuilder, private shapeService: ShapeService) {
    this.form = this.fb.group({
      radius: [null, [Validators.required, Validators.min(0.1)]],
      hoehe: [null, [Validators.required, Validators.min(0.1)]],
    });
  }

  berechnen() {
    const shapeRequest = {
      shapeType: 'kegel',
      parameters: {
        radius: this.form.value.radius,
        hoehe: this.form.value.hoehe
      }
    };

    this.viewerParams = shapeRequest.parameters;
    this.show3D = true;

    this.shapeService.calculate(shapeRequest).subscribe({
      next: (response) => {
        this.volume = response.volume ?? null;
        this.surface = response.surface ?? null;
      },
      error: (err) => {
        console.error('❌ Fehler beim Berechnen (Kegel):', err);
      }
    });
  }
}
