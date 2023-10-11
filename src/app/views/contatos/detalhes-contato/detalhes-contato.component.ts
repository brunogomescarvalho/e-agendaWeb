import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ListaCompromissosViewModel } from '../../compromissos/models/listar-compromissos.view-model';

@Component({
  selector: 'app-detalhes-contato',
  templateUrl: './detalhes-contato.component.html',
  styleUrls: ['./detalhes-contato.component.css']
})
export class DetalhesContatoComponent implements OnInit {

  contato?: VisualizarContatoViewModel

  constructor(private route: ActivatedRoute, private toast: ToastrService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados => dados['contato'])))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (res: any) => this.contato = res
      })
  }

  detalhesCompromisso(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['compromissos/detalhes', compromisso.id])
  }

  voltar() {
    this.location.back()
  }

}
