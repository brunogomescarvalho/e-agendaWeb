export interface TokenUsuario {
  chave: string
  usuario: Usuario
  dataExpiracao: Date
}

export interface Usuario {
  id: string,
  nome: string
  email: string
}
