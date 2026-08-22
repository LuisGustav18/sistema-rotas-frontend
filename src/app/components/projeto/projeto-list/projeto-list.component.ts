import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projeto-list',
  imports: [
      CommonModule,
      MatButtonModule
  ],
  templateUrl: './projeto-list.component.html',
  styleUrl: './projeto-list.component.scss',
})
export class ProjetoListComponent {

  dado: boolean = false;

}
