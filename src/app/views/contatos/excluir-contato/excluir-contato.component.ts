import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ContatoService } from '../service/contato.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit {
  contato?: VisualizarContatoViewModel

  constructor(private service: ContatoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params && this.route.snapshot.params['id']) {
      let id = this.route.snapshot.paramMap.get('id')!
      this.service.selecionarContatoCompletoPorId(id)
        .subscribe((res: any) => this.contato = res)
    }
  }

  excluirContato() {
    this.service.excluir(this.contato!.id)
      .subscribe(() => this.router.navigate(['contatos/listar']))
  }


}
