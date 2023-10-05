import { Component } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormContatosViewModel } from '../models/form-contato-view-model';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent {

  constructor(private service: ContatoService, private router: Router, private toast: ToastrService) { }

  public inserir(contato: FormContatosViewModel) {
    this.service.inserir(contato)
      .subscribe(() => {
        this.toast.success('Contato Cadastrado Com Sucesso!', 'Sucesso!'),
          this.router.navigate(['/contatos/listar'])
      })
  }

}
