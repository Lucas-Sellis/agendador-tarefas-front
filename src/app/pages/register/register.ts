import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../../shared/components/password-field/password-field';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [MatProgressSpinnerModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, PasswordField, ReactiveFormsModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.Emulated  // vamos ficar atento a isso aqui
})

export class Register {
  form: FormGroup;

  isLoading = false; // isso aqui e pra mostrar a bolinha de loading

  constructor (
    private formBuilder: 
    FormBuilder, 
    private userService: UserService,
    private router: Router // cahama o router que leva para algum lugar
  
  )
  
  
  { // injetamos a service aqqui do usuario
    this.form=this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get passwordControl(): FormControl{
    return this.form.get('senha') as FormControl
  }


  get fullNameErrors(): string | null{
    const fullNameErrors = this.form.get('nome');
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




    const formData = this.form.value; // chamamos a service do usuario aqui

    this. isLoading = true; // a bolinha de longin ele vai aparecer

    this.userService.register(formData)
    
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (response) => {
        this.router.navigate(['/login']) // aqui pelo jeito ele vai pra pagina de login

      },
      error: (error) => {
        console.error(`Erro ao registrar usuário`, error)
      },

    })

   
  }

 }
