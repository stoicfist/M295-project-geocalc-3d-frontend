import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-verlauf-tabelle',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './verlauf-tabelle.component.html',
  styleUrls: ['./verlauf-tabelle.component.scss']
})
export class VerlaufTabelleComponent {
  displayedColumns: string[] = ['user', 'shape', 'parameters', 'date'];

  data = [
    { user: 'John Doe', shape: 'Kugel', parameters: 'r = 5', date: '2025-05-10' },
    { user: 'Jane Smith', shape: 'Quader', parameters: '3 x 4 x 5', date: '2025-05-11' },
    { user: 'Bob Johnson', shape: 'Kegel', parameters: 'r = 7, h = 9', date: '2025-05-12' }
  ];
}
