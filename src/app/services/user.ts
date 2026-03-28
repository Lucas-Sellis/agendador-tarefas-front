import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // O "telefone" para ligar pro backend
import { Observable } from 'rxjs'; // O "contrato" de que vamos receber uma resposta depois

// 1. O CONTRATO (Interface)
// Define exatamente quais campos o Java espera receber no JSON
interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root', // Diz que essa service está disponível no app inteiro
})
export class UserService {

  // 2. O ENDEREÇO (URL)
  // Onde o seu servidor Spring Boot está rodando (porta 8080)
  private apiUrl = 'http://localhost:8080';

  // 3. O MENSAGEIRO (HttpClient)
  // Injetamos o 'http' para conseguir fazer as requisições
  constructor(private http: HttpClient) {}

  // 4. A AÇÃO (Método Register)
  // Recebe os dados do formulário e envia para a rota '/usuario' do seu backend
  register(body: UserRegisterPayload): Observable<any> {
    // Faz um POST (Criação) enviando o objeto 'body' no corpo da requisição
    return this.http.post(`${this.apiUrl}/usuario`, body);
  }
}