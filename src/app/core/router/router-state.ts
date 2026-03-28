import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterStateService { // Mudamos o nome para ficar claro que é uma Service

  // 1. O "Baú" que guarda a rota atual
  private rotaAtualSubject$ = new BehaviorSubject<string>('');
  
  // 2. A "Rádio" que os outros componentes escutam
  public readonly rotaAtual$ = this.rotaAtualSubject$.asObservable();

  constructor(private router: Router) {
    // 3. Pega a rota onde o usuário está logo que o app abre
    this.rotaAtualSubject$.next(this.router.url);

    // 4. Fica vigiando toda vez que o usuário muda de página
    this.router.events
      .pipe(
        // Filtra para agir só quando a navegação TERMINAR com sucesso
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((evento: NavigationEnd) => {
        // 5. Avisa todo mundo qual é a nova URL
        this.rotaAtualSubject$.next(evento.url);
      });
  }
}

//Essa service é um vigia em tempo real que avisa todos os componentes do seu app sempre que o usuário muda de página (rota), para que eles saibam exatamente onde estão.