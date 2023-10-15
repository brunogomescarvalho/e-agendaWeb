import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuarioService/usuario.service';
import { Observable } from 'rxjs';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaColapsada: boolean = true;

  usuarioLogado!: Observable<TokenUsuario | null>;

  constructor(private router: Router, private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuarioLogado()
  }

  sair() {

    localStorage.removeItem('tokenEAgenda')
    this.router.navigate(['/login'])
    this.usuarioService.logoutUsuario()

  }
}
