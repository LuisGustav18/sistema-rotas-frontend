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

  ngOnInit(){
    this.rotaProjeto = this.rotaProjetoVerificar();
    this.router.events.subscribe(() => {
      this.rotaProjeto = this.rotaProjetoVerificar();
    })
  }

  toggleMenu(): void {
    this.menu = !this.menu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menu && !this.elementRef.nativeElement.contains(event.target)){
      this.menu = false;
    }
  }

  rotaProjetoVerificar(): boolean {
    return this.router.url === "/projeto";
  }
}
