import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

imgHero = 'assets/imagem-hero.svg'


// constructor(
//   private authService: Auth,
//   private router : Router
// ){}
    
  private authService = inject(Auth)
  private router = inject (Router)


  ngOnInit(): void{ // qunado logar ele vai pra rota taks que mostra as tarefas do usuario
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks'])
    }

  }

}
