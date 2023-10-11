import { Component } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { ListarContatosViewModel } from '../../contatos/models/listar-contato.view-model';

@Component({
  selector: 'app-detalhes-compromisso',
  templateUrl: './detalhes-compromisso.component.html',
  styleUrls: ['./detalhes-compromisso.component.css']
})
export class DetalhesCompromissoComponent {
  compromisso?: VisualizarCompromissoViewModel

  constructor(private route: ActivatedRoute, private toast: ToastrService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados => dados['compromisso'])))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (res: any) => this.compromisso = res
      })
  }

  detalhesContato(contato: ListarContatosViewModel) {
    this.router.navigate(['contatos/detalhes', contato.id])
  }

  voltar() {
    this.location.back()
  }
}
