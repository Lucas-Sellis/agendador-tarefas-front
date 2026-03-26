import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../../shared/components/password-field/password-field';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PasswordField, ReactiveFormsModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.Emulated  // vamos ficar atento a isso aqui
})

export class Register {
  form: FormGroup;

  constructor (private formBuilder: FormBuilder){
    this.form=this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['']
    });
  }


  get passwordControl(): FormControl{
    return this.form.get('password') as FormControl
  }


  get fullNameErrors(): string | null{
    const fullNameErrors = this.form.get('fullName');
    if (fullNameErrors?.hasError('required')) return 'O nome completo é obrigatório'
    if (fullNameErrors?.hasError('minlength')) return 'Cadastre um nome com mais de 3 letras'
    return null
}

  get emailErrors(): string | null{
    const emailErrors = this.form.get('email');
    if (emailErrors?.hasError('required')) return 'O cadastro do e-mail é obrigatório'
    if (emailErrors?.hasError('email')) return 'Este e-mail é inválido'
    return null
}

  submit(){

    if (this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    console.log("formulário submetido",this.form.value)
  }

 }
