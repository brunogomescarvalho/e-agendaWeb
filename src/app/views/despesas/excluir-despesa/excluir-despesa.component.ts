import { Component, OnInit } from '@angular/core';
import { VisualizarDespesasViewModel } from '../models/visualizar-despesa.view-model';
import { DespesasService } from '../service/despesas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styleUrls: ['./excluir-despesa.component.css']
})
export class ExcluirDespesaComponent implements OnInit {

  despesa!: VisualizarDespesasViewModel


  constructor(private service: DespesasService, private route: ActivatedRoute, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['despesa']))
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (despesa) => this.despesa = despesa
      })
  }

  excluirDespesa() {
    this.service.excluir(this.despesa.id)
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: () => {
          this.toast.success('Despesa excluída com sucesso', 'Sucesso')
          this.router.navigate(['despesas/listar'])
        }
      })
  }

}
