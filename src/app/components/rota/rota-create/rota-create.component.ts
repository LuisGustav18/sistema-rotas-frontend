import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RotaService } from '../../../services/rota.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Rota } from '../../../model/rota';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ImagemService } from '../../../services/imagem.service';

@Component({
  selector: 'app-rota-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIcon,
    DialogModule,
    CommonModule
  ],
  templateUrl: './rota-create.component.html',
  styleUrl: './rota-create.component.scss',
})
export class RotaCreateComponent {

  rota: Rota = {
    titulo: '',
    descricao: '',
    data: '',
    projeto: '',
    longitude: 0,
    latitude: 0,
    imagens: []
  }

  arquivosSelecionados: File[] = [];
  previews: string[] = [];

  titulo = new FormControl(null, [Validators.minLength(1), Validators.required]);
  descricao = new FormControl(null);
  data = new FormControl(null);

  constructor(
    private service: RotaService,
    private dialog: MatDialog,
    private imagemService: ImagemService,
    @Inject(MAT_DIALOG_DATA) private dados: any
  ) { }

  ngOnInit() {
    this.rota.longitude = this.dados.longitude;
    this.rota.latitude = this.dados.latitude;
    this.rota.projeto = this.dados.id;
  }

  public create() {

    this.rota.titulo = this.titulo.value ?? '';
    this.rota.descricao = this.descricao.value ?? '';

    if (this.data.value) {
      this.rota.data = this.formatarData(this.data.value)
    }

    this.service.create(this.rota).subscribe({
      next: (rota) => {

        for (const arquivo of this.arquivosSelecionados) {

          this.imagemService.create(rota.id!, arquivo).subscribe({
            error: (error) => {
              console.error('Erro ao salvar imagem: ', arquivo.name, error)
            }
          })
        }
        this.fechar();
      }
    })
  }

  public fechar(){
    this.dialog.closeAll();
  }

  public formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  public eventoArquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const novosArquivos = Array.from(input.files);

    this.arquivosSelecionados.push(...novosArquivos);

    this.previews.push(
      ...novosArquivos.map(arquivo => 
        URL.createObjectURL(arquivo)
      )
    );

    input.value = '';
  }

  public removerImagem(index: number): void {
    this.arquivosSelecionados.splice(index, 1);
  }
}
