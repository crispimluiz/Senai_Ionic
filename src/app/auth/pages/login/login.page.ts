import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;

  configs = {
    isSignIn: true, /*verifica se login deu certo */
    action : 'Login', /*se deu certo */
    actionChange: 'Create account'/*para nova conta */
  }; /*abaixo para uma nova conta */
  private nameControl = new FormControl('',
    [Validators.required, Validators.minLength(3)]);

  constructor(private fb: FormBuilder) { }
  /*Construtor vai subir a tecnologia FormBuilder
  e dar o apelido fb*/
  ngOnInit(): void {
    this.createForm(); /*Criar um método vazio - void
    e demos o nome */
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      /*Validação required (Não aceita nulo), valida email*/
      password: ['', [Validators.required, Validators.minLength(6)]]
      /*Validar somente acima de 6 caracteres */
    });
  }

/*esse gets são para retornas erros ou avisos */
  get name(): FormControl {
    return this.authForm.get('email') as FormControl;
  }
  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    /* Recebe a negação de mesmo */
    return this.authForm.get('password') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    /* CUma constante que pega a configuração do isSignIn */
    const{ isSignIn } = this.configs;
    /* Se ? - login ok, senão vá para Sign Up */
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    /* mensagens se vai criar uma conta ou se que já tem conta */
    this.configs.actionChange = isSignIn ? 'Create account' : 'Você já tem uma conta';
    !isSignIn
    /*Olha o Interrogação, se não tem conta login então add uma conta */
      ? this.authForm.addControl('name', this.nameControl)
    /* Mas se não for uma nova conta não add nada */
    : this.authForm.removeControl('name');
  }

  onSubmit(): void {
    console.log('AutoForm: ', this.authForm.value);
    /*console é para sair na tela, como aconteçe no console no Java */
  }
}
