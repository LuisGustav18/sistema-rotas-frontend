import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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
import { ImagemService } from '../../../services/imagem.service';
import { CommonModule } from '@angular/common';
import { UUIDTypes } from 'uuid';
import { Imagem } from '../../../model/imagem';

@Component({
  selector: 'app-rota-update',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
    DialogModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './rota-update.component.html',
  styleUrl: './rota-update.component.scss',
})
export class RotaUpdateComponent {

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

  titulo = new FormControl(this.rota.titulo, [Validators.minLength(1), Validators.required]);
  descricao = new FormControl(this.rota.descricao);
  data = new FormControl(this.rota.data);

  constructor(
    private service: RotaService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private imagemService: ImagemService,
    @Inject(MAT_DIALOG_DATA) private dados: any
  ) { }

  ngOnInit() {
    this.rota = this.dados.rota;
    this.titulo.setValue(this.rota.titulo);
    this.descricao.setValue(this.rota.descricao);
    if (this.rota.data) {
      this.data.setValue(this.desformatarData(this.rota.data));
    }
    this.cd.detectChanges();
  }

  public update() {

    this.rota.titulo = this.titulo.value ?? '';
    this.rota.descricao = this.descricao.value ?? '';

    if (this.data.value) {
      this.rota.data = this.formatarData(this.data.value)
    }
    
    this.service.update(this.rota).subscribe({
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
    this.fechar();
  }

  public findById(): void {
    const id = this.dados.rota.id
    this.imagemService.findImagemByRota(id).subscribe({
      next: (reposta) => {
        this.rota.imagens = reposta;
        this.cd.detectChanges();
      },
      error: () => {
        console.error("Erro ao atualizar rota")
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

  public fechar() {
    this.dialog.closeAll();
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

  public removerImagemSalva(imagem: Imagem): void {

    const id = imagem.id

    if (id == null){
      return;
    }

    this.imagemService.delete(id).subscribe({
      next: () => {
        this.findById();
      },
      error: () => {
        console.error("Erro ao deletar imagem");
      }
    }) 
  }
}
