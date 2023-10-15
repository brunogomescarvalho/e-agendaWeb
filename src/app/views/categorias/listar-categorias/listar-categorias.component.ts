import { Component, OnInit } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/listar-categorias-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  categorias?: ListarCategoriasViewModel[]

  constructor(private route: ActivatedRoute, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe((map(dados => dados['categorias']))).subscribe({
      error: (erro: Error) => this.toast.error(erro.message, 'Erro'),
      next: (dados) => {
        this.categorias = dados
        if (this.categorias?.length == 0)
          this.toast.warning('Nenhuma categoria cadastrada até o momento')
      }

    })
  }

  excluir(categoria: ListarCategoriasViewModel) {
    this.router.navigate(['categorias/excluir', categoria.id])
  }

  editar(categoria: ListarCategoriasViewModel) {
    this.router.navigate(['categorias/editar', categoria.id])
  }

  detalhes(categoria: ListarCategoriasViewModel) {
    this.router.navigate(['categorias/detalhes', categoria.id])
  }
}
