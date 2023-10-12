import { Component, OnInit } from '@angular/core';
import { VisualizarDespesasViewModel } from '../models/visualizar-despesa.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DespesasService } from '../service/despesas.service';

@Component({
  selector: 'app-detalhes-despesa',
  templateUrl: './detalhes-despesa.component.html',
  styleUrls: ['./detalhes-despesa.component.css']
})
export class DetalhesDespesaComponent implements OnInit {

  despesa!: VisualizarDespesasViewModel


  constructor(private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['despesa']))
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (despesa) => this.despesa = despesa
      })
  }
}
