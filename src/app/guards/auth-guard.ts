import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {


  // aqui estamos protegendo a rota tasks se a pessoa nao tem uma tarefa ela nao pode acessar essa rota pelo que parece
const authService = inject(Auth)
const router = inject(Router)

if(authService.isLoggedIn()){
  return true;
  
}else{
  router.navigate(['/login'])
   return false;
}

 
};
