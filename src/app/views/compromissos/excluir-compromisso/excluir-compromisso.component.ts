import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../service/compromisso.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit {

  constructor(private service: CompromissoService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) { }

  idSelecionado!: string

  compromisso?: VisualizarCompromissoViewModel

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.params['id']!
    this.route.data.pipe(map((dados => dados['compromisso'])))
      .subscribe({
        error: (err) => this.toast.error(err.message, 'Erro!'),
        next: (compromisso) => this.compromisso = compromisso
      })
  }


  excluirCompromisso() {
    this.service.excluir(this.compromisso?.id!)
      .subscribe({
        error: (err) => this.toast.error(err.message, 'Erro!'),
        next: () => {
          this.toast.success('Compromisso excluído com sucesso'),
            this.router.navigate(['compromissos/listar'])
        }
      })
  }
}
