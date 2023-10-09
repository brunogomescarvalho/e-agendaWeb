import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../service/compromisso.service';
import { ListaCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos!: ListaCompromissosViewModel[]


  constructor(private route: ActivatedRoute, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromissos']))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (dados) => {
          this.compromissos = dados
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
