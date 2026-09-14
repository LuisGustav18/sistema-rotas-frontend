import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjetoService } from '../../../services/projeto.service';

@Component({
  selector: 'app-projeto-delete',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './projeto-delete.component.html',
  styleUrl: './projeto-delete.component.scss',
})
export class ProjetoDeleteComponent {

  constructor(
    private dialog: MatDialog,
    private service: ProjetoService,
    @Inject(MAT_DIALOG_DATA) private data: any 
  ) {}

  public deletar(){
    this.service.delete(this.data.id).subscribe({
      next: () => {
        this.fechar();
      }
    })
  }

  public fechar() {
    this.dialog.closeAll();
  }
}
