import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../service/compromisso.service';
import { ListaCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos!: ListaCompromissosViewModel[]


  constructor(private service: CompromissoService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.service.selecionarTodos()
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (dados) => this.compromissos = dados,
        complete: () => {
          if (this.compromissos?.length == 0)
            this.toast.warning('Nenhum compromisso cadastrado até o momento')
        }
      })
  }


  public editar(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/editar', compromisso.id])
  }

  public excluir(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/excluir', compromisso.id])
  }

}
