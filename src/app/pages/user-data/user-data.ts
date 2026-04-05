import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse, UserService } from '../../services/user';
import { DialogField, ModalDialog } from '../../shared/components/modal-dialog/modal-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-data',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-data.html',
  styleUrl: './user-data.scss',
})
export class UserData {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  readonly dialog = inject(MatDialog);

  // 1. Pegamos os dados do usuário
  user = this.userService.getUser();

  // 2. Inicializamos o formulário usando os dados da variável acima
  form: FormGroup = this.formBuilder.group({
    nome: [{ value: this.user?.nome || '', disabled: true }],
    email: [{ value: this.user?.email || '', disabled: true }],
  });

  // cara isso aqui é uma tal de Modal foi pego la no angular material

  cadastrarEndereco() {
    const formConfig: DialogField[] = [
      { name: 'cep', label: 'CEP', validators: [Validators.required] },
      { name: 'rua', label: 'Rua' },
      { name: 'numero', label: 'Número' },
      { name: 'complement', label: 'Complemento' },
      { name: 'cidade', label: 'Cidade' },
      { name: 'estado', label: 'Estado' },
    ];

    const dialogRef = this.dialog.open(ModalDialog, {
      data: { title: 'Adicionar Endereço', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  cadastrarTelefone() {
    const formConfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', validators: [Validators.required] },
      { name: 'numero', label: 'Número', validators: [Validators.required] },
    ];

    const dialogRef = this.dialog.open(ModalDialog, {
      data: { title: 'Adicionar Telefone', formConfig },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
