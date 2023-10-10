import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit {

  categoria!: VisualizarCategoriaViewModel

  constructor(private route: ActivatedRoute, private toast: ToastrService, private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(dados => dados['categoria']))
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (dados) => this.categoria = dados
      })
  }

  excluir() {
    this.service.excluir(this.categoria.id)
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: () => {
          this.toast.success('Categoria excluída com sucesso')
          this.router.navigate(['categorias/listar'])
        }
      })
  }
}


