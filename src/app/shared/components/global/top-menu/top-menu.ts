import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterModule } from "@angular/router";
import { every, filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})


export class TopMenu implements OnInit, OnDestroy {

  appLogo = 'assets/logo-agendador-javanauta.png'

  rotaAtual: string = '';
  inscricaoRota!: Subscription;

  constructor(private router: Router) { }


  //Ciclo de vida do Componente
  
  ngOnInit(): void {
    this.rotaAtual = this.router.url
    this.inscricaoRota = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((evento: any) => {
        this.rotaAtual = evento.url //troca a rotaAtual com base no URL
        console.log("rotaAtual:", this.rotaAtual)
      })
  }


  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe();
  }


  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register'
  }

}
