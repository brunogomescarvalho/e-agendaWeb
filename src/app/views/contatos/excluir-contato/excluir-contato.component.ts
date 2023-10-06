import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatoService } from '../service/contato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit {
  contato?: VisualizarContatoViewModel

  constructor(private service: ContatoService, private route: ActivatedRoute, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params && this.route.snapshot.params['id']) {
      let id = this.route.snapshot.paramMap.get('id')!
      this.service.selecionarContatoCompletoPorId(id)
        .subscribe({
          error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
          next: (res: any) => this.contato = res
        })
    }
  }

  excluirContato() {
    this.service.excluir(this.contato!.id)
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: () => this.router.navigate(['contatos/listar'])
      })
  }


}
