import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quader',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './quader.component.html',
  styleUrls: ['./quader.component.scss']
})
export class QuaderComponent {
  form: FormGroup;
  result: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      a: [null, [Validators.required, Validators.min(0.1)]],
      b: [null, [Validators.required, Validators.min(0.1)]],
      h: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  berechnen() {
    const { a, b, h } = this.form.value;
    if (a > 0 && b > 0 && h > 0) {
      const volumen = a * b * h;
      this.result = +volumen.toFixed(2);
    }
  }
}
