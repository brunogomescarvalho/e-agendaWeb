import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUsuarioViewModel } from '../models/login.view-model';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';
import { LoginService } from 'src/app/core/services/authService/login.service';
import { TokenUsuario } from '../models/token.view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private service: LoginService, private toast: ToastrService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.form.valid) {
      let usuario = new LoginUsuarioViewModel(this.form.value.email, this.form.value.senha)
      this.service.autenticar(usuario)
        .subscribe({
          error: (erro: Error) => this.toast.error(erro.message, 'Usuário não encontrado'),
          next: (usuario) => {
            const tokenUsuario: TokenUsuario = {
              chave: usuario.dados.chave,
              usuario: usuario.dados.usuarioToken,
              dataExpiracao: usuario.dados.dataExpiracao,
            }
            this.usuarioService.logarUsario(tokenUsuario)
            this.router.navigate(['/dashboard'])
          }
        })
    }

    else {
      this.toast.error(this.form.validate().join("<br/>"), 'Erros ao Enviar Formulário', { enableHtml: true });
    }
  }

}




