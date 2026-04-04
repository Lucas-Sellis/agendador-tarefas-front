import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse, UserService } from '../../services/user';

@Component({
  selector: 'app-user-data',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-data.html',
  styleUrl: './user-data.scss',
})
export class UserData {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  // 1. Pegamos os dados do usuário
  user = this.userService.getUser();

  // 2. Inicializamos o formulário usando os dados da variável acima
  form: FormGroup = this.formBuilder.group({
    nome: [{ value: this.user?.nome || '', disabled: true }],
    email: [{ value: this.user?.email || '', disabled: true }],
  });

  cadastrarEndereco(){
  }

  cadastrarTelefone(){
  }

}
