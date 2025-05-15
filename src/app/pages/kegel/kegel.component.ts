import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kegel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './kegel.component.html',
  styleUrls: ['./kegel.component.scss']
})
export class KegelComponent {
  form: FormGroup;
  result: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      r: [null, [Validators.required, Validators.min(0.1)]],
      h: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  berechnen() {
    const { r, h } = this.form.value;
    if (r > 0 && h > 0) {
      const volumen = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
      this.result = +volumen.toFixed(2);
    }
  }
}
