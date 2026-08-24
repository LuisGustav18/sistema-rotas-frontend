import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {

  rotaProjeto: boolean = false;
  menu: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  // Verificamos em todas as paginas se estamos em projeto ( para ocultar o campo )
  ngOnInit(){
    this.rotaProjeto = this.rotaProjetoVerificar();
    this.router.events.subscribe(() => {
      this.rotaProjeto = this.rotaProjetoVerificar();
    })
  }

  // Invertemos o sentido do valor atribuido dentro da varivel menu (true = false) (false = true)
  toggleMenu(): void {
    this.menu = !this.menu;
  }

  // Aqui verificamos o campo do html é se estamos clicando dentro do campo button do menu, onde pegamos o click do mouse é verificamos se ele está true, pra fechar
  @HostListener('document:click', ['$event']) 
  onDocumentClick(event: MouseEvent): void {
    if (this.menu && !this.elementRef.nativeElement.contains(event.target)){
      this.menu = false;
    }
  }

  // Verifico o caminho da url atual para ocultar o campo do menu 
  rotaProjetoVerificar(): boolean {
    return this.router.url === "/projeto";
  }
}
