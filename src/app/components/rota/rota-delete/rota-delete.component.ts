import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RotaService } from '../../../services/rota.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rota-delete',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './rota-delete.component.html',
  styleUrl: './rota-delete.component.scss',
})
export class RotaDeleteComponent {

    constructor(
    private dialog: MatDialog,
    private service: RotaService,
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
