import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarioLogado?: string
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    if (!this.loginService.tokenValido())
      this.router.navigate(['/login'])
    else
      this.usuarioLogado = this.loginService.obterUsuarioLogado()

  }

}
