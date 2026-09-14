import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProjetoService } from '../../../services/projeto.service';
import { Projeto } from '../../../model/projeto';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjetoCreateComponent } from '../projeto-create/projeto-create.component';
import { MatIcon } from '@angular/material/icon';
import { ProjetoUpdateComponent } from '../projeto-update/projeto-update.component';
import { ProjetoDeleteComponent } from '../projeto-delete/projeto-delete.component';

@Component({
  selector: 'app-projeto-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIcon
  ],
  templateUrl: './projeto-list.component.html',
  styleUrl: './projeto-list.component.scss',
})
export class ProjetoListComponent {

  dado: boolean = true;
  listaProjetos: Projeto[] = []

  projeto: Projeto | null = null

  constructor(
    private service: ProjetoService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listagem();
  }

  private listagem() {
    this.service.findbyUsuario().subscribe({
      next: (resposta) => {
        this.listaProjetos = resposta;
        this.verificarTamanhoLista(this.listaProjetos.length)
        this.cd.detectChanges();
      }
    })
  }

  private verificarTamanhoLista(tamanho: number){
    if (tamanho > 0) {
      this.dado = false;
    }
  }

  lerProjeto(projeto: Projeto) {
    this.projeto = projeto;
  }

  public criarProjeto() {
    this.dialog.open(ProjetoCreateComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      this.listagem();
    }
    )
  }

  public atualizarProjeto() {
    this.dialog.open(ProjetoUpdateComponent, {
      data: {
        projeto: this.projeto
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.listagem();
      this.cd.detectChanges();
    }
    )
  }

  public deletarProjeto() {
    this.dialog.open(ProjetoDeleteComponent, {
      data: {
        id: this.projeto?.id
      },
      autoFocus: false
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.projeto = null;
      this.listagem();
      this.cd.detectChanges();
    }
    )
  }
}
