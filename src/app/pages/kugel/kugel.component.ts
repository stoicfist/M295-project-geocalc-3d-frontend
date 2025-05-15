import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kugel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './kugel.component.html',
  styleUrls: ['./kugel.component.scss']
})
export class KugelComponent {
  form: FormGroup;
  result: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      radius: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  berechnen() {
    const radius = this.form.value.radius;
    if (radius > 0) {
      const volumen = (4 / 3) * Math.PI * Math.pow(radius, 3);
      this.result = +volumen.toFixed(2);
    }
  }
}
