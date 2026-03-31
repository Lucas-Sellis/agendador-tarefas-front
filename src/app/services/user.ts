import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // O telefone" para ligar pro backend
import { Observable } from 'rxjs'; // O "contrato" de que vamos receber uma resposta depois

// 1. O CONTRATO (Interface)
// Define exatamente quais campos o Java espera receber no JSON
interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
  enderecos?: [
    {
      // aqui pode nao existir, se existir pega esse array
      rua: string;
      numero: number;
      complemento: string;
      cidade: string;
      estado: string;
      cep: string;
    },
  ];
  telefones?: [
    // aqui pode nao existir, se existir pega esse array
    {
      numero: string;
      ddd: string;
    },
  ];
}

export interface UserLoginPayload {
  email: string;
  senha: string;
}

interface UserRegisterResponse {
  nome: string;
  email: string;
  enderecos:
    | [
        {
          // aqui eles existem ou podem ser null
          rua: string;
          numero: number;
          complemento: string;
          cidade: string;
          estado: string;
          cep: string;
        },
      ]
    | null;
  telefones: [
    {
      numero: string;
      ddd: string;
    } | null,
  ];
}

@Injectable({
  providedIn: 'root', // Diz que essa service está disponível no app inteiro
})
export class UserService {
  // 2. O ENDEREÇO (URL)
  // Onde o seu servidor Spring Boot está rodando (porta 8080)
  private apiUrl = 'http://localhost:8083';

  // 3. O MENSAGEIRO (HttpClient)
  // Injetamos o 'http' para conseguir fazer as requisições
  constructor(private http: HttpClient) {}

  // 4. A AÇÃO (Método Register)
  // Recebe os dados do formulário e envia para a rota '/usuario' do seu backend
  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    // ele puxou o register la de cima com as coisas que vou receber
    // Faz um POST (Criação) enviando o objeto 'body' no corpo da requisição
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/usuario`, body);
  }

  login(body: UserLoginPayload): Observable<string> {
    // ele puxou o register la de cima com as coisas que vou receber
    // Faz um POST (Criação) enviando o objeto 'body' no corpo da requisição
    return this.http.post<string>(`${this.apiUrl}/usuario/login`, body, {responseType: 'text' as 'json'});
  }
}
