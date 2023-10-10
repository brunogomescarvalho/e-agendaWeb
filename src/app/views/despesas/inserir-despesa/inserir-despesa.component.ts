import { Component, OnInit } from '@angular/core';
import { DespesasService } from '../service/despesas.service';
import { ListarCategoriasViewModel } from '../../categorias/models/listar-categorias-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FormDespesaViewModel } from '../models/form-despesa.view-model';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit {

  categorias!: ListarCategoriasViewModel[]

  constructor(private service: DespesasService, private route: ActivatedRoute, private toast: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.route.data.pipe(
      map(dados => dados['categorias']),
    ).subscribe({
      error: (erro: Error) => this.toast.error(erro.message),
      next: (dados) => this.categorias = dados
    })
  }

  public inserir(despesa: FormDespesaViewModel) {
    this.service.inserir(despesa)
      .subscribe({
        error: (erro: Error) => this.toast.error(erro.message),
        next: () => {
          this.toast.success('Despesa Cadastrada com sucesso')
          this.router.navigate(['despesas/listar'])
        },
      })
  }
}
