import { ChangeDetectorRef, Component } from '@angular/core';
import { email } from '@angular/forms/signals';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Credenciais } from '../../model/credenciais';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {


  erro: boolean = false;
  messagemErro: string = "";

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(8));

  constructor(
    private service: AuthService,
    private router: Router,
    private dc: ChangeDetectorRef
  ) { }

  login() {

    this.creds.email = this.email.value ?? '';
    this.creds.senha = this.senha.value ?? '';

    this.service.authenticate(this.creds).subscribe({
      next: () => {
        if (this.service.isAuthenticated()) {
          this.router.navigate(['/projeto'])
        }
      },
      error: (error) => {
        this.messagemErro = error.error;
        this.erro = true;
        this.dc.detectChanges()
      }
    })
  }

  validarCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
}
