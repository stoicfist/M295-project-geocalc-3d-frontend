import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'app-kugel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './kugel.component.html',
  styleUrls: ['./kugel.component.scss']
})
export class KugelComponent {
  form: FormGroup;
  volume: number | null = null;
  surface: number | null = null;

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
      },
      error: (err) => {
        console.error('❌ Fehler beim Berechnen:', err);
      }
    });
  }
}

