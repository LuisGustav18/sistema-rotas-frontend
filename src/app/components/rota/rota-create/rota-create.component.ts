import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rota-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIcon
  ],
  templateUrl: './rota-create.component.html',
  styleUrl: './rota-create.component.scss',
})
export class RotaCreateComponent {

  onFileSelected(event: Event){
  }
}
