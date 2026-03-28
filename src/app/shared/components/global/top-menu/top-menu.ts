import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  RouterLink, RouterModule } from "@angular/router";
import {  Subscription } from 'rxjs';
import { RouterStateService } from '../../../../core/router/router-state';
@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})


export class TopMenu implements OnInit, OnDestroy {

  // 1. Definição de constantes e variáveis de estado
  appLogo = 'assets/logo-agendador-javanauta.png';
  rotaAtual: string = ''; // Armazena o texto da URL atual (ex: '/login')
  
  // O sinal '!' diz ao TS: "Eu sei que vou inicializar isso depois"
  inscricaoRota!: Subscription; 

  // 2. Injeção de Dependência Moderna
  // O 'inject' busca a Service que criamos para vigiar as rotas
  private routerService = inject(RouterStateService); 

  /**
   * ngOnInit: Ciclo de vida disparado quando o componente "nasce"
   */
  ngOnInit(): void {
    // Criamos uma "assinatura" (subscribe) para ouvir a rádio (Observable)
    // Toda vez que a URL mudar na Service, esse código aqui dentro roda
    this.inscricaoRota = this.routerService.rotaAtual$.subscribe(url => {
      this.rotaAtual = url; // Atualiza a variável local com a nova URL
      console.log('Opa, mudei de página para:', this.rotaAtual);
    });
  }

  /**
   * ngOnDestroy: Ciclo de vida disparado quando o componente "morre" (é destruído)
   */
  ngOnDestroy(): void {
    // IMPORTANTE: Cancelamos a assinatura para não gastar memória 
    // e evitar que o código continue rodando "fantasma" em segundo plano.
    this.inscricaoRota.unsubscribe();
  }

  /**
   * Função Auxiliar para o HTML
   * Retorna 'true' se o usuário estiver exatamente na página de registro
   */
  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register';
  }
}

// Sua classe é um ouvinte em tempo real que monitora a navegação do usuário e atualiza automaticamente o menu para esconder ou mostrar botões (como o de cadastro) dependendo da página onde ele está.