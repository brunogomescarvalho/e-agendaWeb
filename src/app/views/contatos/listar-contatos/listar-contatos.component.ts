import { Component, OnInit } from '@angular/core';
import { ListarContatosViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos?: ListarContatosViewModel[]

  constructor(private router: Router, private toast: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['contatos']))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (dados) => this.contatos = dados,
        complete: () => {
          if (this.contatos?.length == 0)
            this.toast.warning('Nenhum contato cadastrado até o momento')
        }
      })
  }

  public editar(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/editar', contato.id])
  }

  public excluir(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/excluir', contato.id])
  }

}
