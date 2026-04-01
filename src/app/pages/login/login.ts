import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../../shared/components/password-field/password-field';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserLoginPayload, UserService } from '../../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordField,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.Emulated, // vamos ficar atento a isso aqui
})
export class Login {
  form: FormGroup<{ email: FormControl<string>; senha: FormControl<string> }>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: Auth,
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      senha: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void{ // qunado logar ele vai pra rota taks que mostra as tarefas do usuario
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks'])
    }

  }






  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get emailErrors(): string | null {
    const emailErrors = this.form.get('email');
    if (emailErrors?.hasError('required')) return 'A informação do e-mail é obrigatória';
    if (emailErrors?.hasError('email')) return 'Este e-mail é inválido';
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value as UserLoginPayload; // chamamos a service do usuario aqui

    this.isLoading = true; // a bolinha de longin ele vai aparecer

    this.userService
      .login(formData)

      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response)
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error(`Erro ao entrar`, error);
        },
      });
  }
}
