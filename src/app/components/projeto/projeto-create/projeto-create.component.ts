import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ProjetoService } from '../../../services/projeto.service';
import { Projeto } from '../../../model/projeto';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './projeto-create.component.html',
  styleUrl: './projeto-create.component.scss',
})
export class ProjetoCreateComponent {

  projeto: Projeto = {
    titulo: '',
    data: '',
  }

  erro: boolean = false;
  mensagemErro: string = "";

  titulo = new FormControl(null, [Validators.minLength(1), Validators.required]);
  data = new FormControl(null);

  constructor(
    private service: ProjetoService,
    private dialog: MatDialog
  ) { }

  public create() {
    this.projeto.titulo = this.titulo.value ?? '';
    if (this.data.value) {
      this.projeto.data = this.formatarData(this.data.value);
    }

    this.service.create(this.projeto).subscribe({
      next: () => {
        this.fechar();
      },
      error: (error) => {
        this.erro = true;
        this.mensagemErro = error.error
        }
    })
  }

  private formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  public fechar() {
    this.dialog.closeAll();
  }

  public validarCampos(): boolean {
    if (this.titulo.value != null){
      const valor: string = this.titulo.value;
      return valor.trim().length > 0 && this.titulo.valid;
    }
    return false;
  }
}
