import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // O telefone" para ligar pro backend
import { Observable, tap } from 'rxjs'; // O "contrato" de que vamos receber uma resposta depois
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from './auth';

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

export interface UserResponse {
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


  private jwtHelper = new JwtHelperService;

  user = signal <UserResponse | null>(null)






  // 3. O MENSAGEIRO (HttpClient)
  // Injetamos o 'http' para conseguir fazer as requisições
  constructor(private http: HttpClient, private authService: Auth) {
    const usuarioSalvo = this.authService.getUser();
    if(usuarioSalvo){
      this.user.set(usuarioSalvo)
    }
  }

  // 4. A AÇÃO (Método Register)
  // Recebe os dados do formulário e envia para a rota '/usuario' do seu backend
  register(body: UserRegisterPayload): Observable<UserResponse> {
    // ele puxou o register la de cima com as coisas que vou receber
    // Faz um POST (Criação) enviando o objeto 'body' no corpo da requisição
    return this.http.post<UserResponse>(`${this.apiUrl}/usuario`, body);
  }

  login(body: UserLoginPayload): Observable<string> {
    // ele puxou o register la de cima com as coisas que vou receber
    // Faz um POST (Criação) enviando o objeto 'body' no corpo da requisição
    return this.http.post<string>(`${this.apiUrl}/usuario/login`, body, {responseType: 'text' as 'json'});
  }

  getUserByEmail(token:string){
    const email = this.getEmailFromToken(token);

    if (!email) throw new Error('Token Inválido');

    const headers = new HttpHeaders({Authorization: `${token}`})

    return this.http.get<UserResponse>(`${this.apiUrl}/usuario?email=${email}`, {headers})
    
  }


  getEmailFromToken(token: string): string | null{

    try {
      const decoded = this.jwtHelper.decodeToken(token)

      console.log("token", decoded)
      return decoded?.sub || null
    } catch (error) {
      return null
    }
  }

  getUser(): UserResponse| null{
    return this.user()
  }




}
