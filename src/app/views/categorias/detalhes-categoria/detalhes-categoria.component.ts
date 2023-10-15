import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-detalhes-categoria',
  templateUrl: './detalhes-categoria.component.html',
  styleUrls: ['./detalhes-categoria.component.css']
})
export class DetalhesCategoriaComponent implements OnInit {

  categoria!: VisualizarCategoriaViewModel


  constructor(private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['categoria']))
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (categoria) => this.categoria = categoria
      })
  }
}
