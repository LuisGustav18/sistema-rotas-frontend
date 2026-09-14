import { DialogModule } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Projeto } from '../../../model/projeto';
import { ProjetoService } from '../../../services/projeto.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UUIDTypes } from 'uuid';

@Component({
  selector: 'app-projeto-update',
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
  templateUrl: './projeto-update.component.html',
  styleUrl: './projeto-update.component.scss',
})
export class ProjetoUpdateComponent {

  projeto: Projeto = {
    titulo: '',
    data: ''
  }

  erro: boolean = false;
  mensagemErro: string = "";

  titulo = new FormControl(this.projeto.titulo, [Validators.minLength(1), Validators.required]);
  data = new FormControl(this.projeto.data);

  constructor(
    private dialog: MatDialog,
    private service: ProjetoService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private dados: any) { }

  ngOnInit() {
    this.projeto = this.dados.projeto;
    this.titulo.setValue(this.projeto.titulo);
    if (this.projeto.data != null) {
      this.data.setValue(this.desformatarData(this.projeto.data))
    }
    this.cd.detectChanges();
  }

  update() {
    this.projeto.titulo = this.titulo.value ?? '';
    if (this.data.value) {
      this.projeto.data = this.formatarData(this.data.value);
    }

    this.service.update(this.projeto).subscribe({
      next: () => {
        this.dialog.closeAll();
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

  private desformatarData(data: string): string {
    const [ano, mes, dia] = data.split('/');
    return `${dia}-${mes}-${ano}`;
  }

  public cancelar() {
    this.dialog.closeAll();
  }

  public validarCampos(): boolean {
    if (this.projeto.titulo == this.titulo.value 
      && (this.desformatarData(this.projeto.data ?? '') == this.data.value || this.projeto.data == null)) {
        return false;
      }

    if (this.titulo.value != null) {
      const valor: string = this.titulo.value;
      return valor.trim().length > 0 && this.titulo.valid;
    }
    return false;
  }
}
