import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-cadastro',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {

  erro: boolean = false;
  mensagemError: string = '';

  usuario: Usuario = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));

  constructor(
    private service: UsuarioService,
    private router: Router
  ) {}


  create(){

    this.erro = false
    this.usuario.email = this.email.value ?? '';
    this.usuario.senha = this.senha.value ?? '';

    this.service.create(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['login'])
      },
      error: (error) => {
        this.erro = true;
        this.mensagemError = error.error;
      }
    })
  }

  validarCampos(): boolean {
    return this.email.valid &&
    this.senha.valid
  }
}
