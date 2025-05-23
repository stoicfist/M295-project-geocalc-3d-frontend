import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';
import { Viewer3dComponent } from '../viewer3d/viewer3d.component';

@Component({
  selector: 'app-kugel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Viewer3dComponent
  ],
  templateUrl: './kugel.component.html',
  styleUrls: ['./kugel.component.scss']
})
export class KugelComponent {
  form: FormGroup;
  volume: number | null = null;
  surface: number | null = null;
  result: { volume: number; surface: number } | null = null;
  show3D = false;
  viewerParams: any = {};

  constructor(private fb: FormBuilder, private shapeService: ShapeService) {
    this.form = this.fb.group({
      radius: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  berechnen() {
    const shapeRequest = {
      shapeType: 'kugel',
      parameters: {
        radius: this.form.value.radius
      }
    };

    this.shapeService.calculate(shapeRequest).subscribe({
      next: (response) => {
        this.volume = response.volume ?? null;
        this.surface = response.surface ?? null;
        this.viewerParams = shapeRequest.parameters;
        this.show3D = false;
        setTimeout(() => this.show3D = true, 0); // *ngIf trick
      },
      error: (err) => {
        console.error('❌ Fehler beim Berechnen:', err);
      }
    });
  }
}

