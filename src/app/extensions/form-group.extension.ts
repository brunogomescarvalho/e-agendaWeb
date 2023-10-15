import { FormGroup } from "@angular/forms";

declare module '@angular/forms' {
    interface FormGroup {
        validate(): string[];
        campoValido(campo: string): boolean | undefined;
    }
}

FormGroup.prototype.validate = function () {
    let erros: string[] = []

    for (let item of Object.keys(this.controls)) {
        const control = this.get(item)

        if (control?.invalid) {
            let msg!: string

            if (control.errors!['dataInvalida'])
                msg = '* A data deve ser superior a data de hoje';

            else if (control.errors!['email'])
                msg = '* E-mail informado em formato inválido'

            else if (control.errors!['categoriaDespesaNaoSelecionada'])
                msg = '* É necessário selecionar ao menos uma categoria'

            else if (control.errors!['senhasDiferentes'])
                msg = '* As senhas digitadas são diferentes'

            else if (control.errors!['senhaMinLength']) 
                msg = `*A senha precisa ter no mínimo '6' caracteres`
            
            else if (control.errors!['caracterEspecial']) 
                msg = `*A senha precisa ter no mínimo '1' caracter não alfa-numérico`
            
            else if (control.errors!['letraCaixaAlta']) 
                msg = `*A senha precisa ter no mínimo '1' letra 'Maiúscula'`
            
            else if (control.errors!['letraCaixaBaixa']) 
                msg = `*A senha precisa ter no mínimo '1' letra 'Minúscula'`
            
            else
                msg = `* O campo '${item}' é obrigatório`

            erros.push(msg)
            control?.markAsTouched()
        }
    }
    return erros
}



FormGroup.prototype.campoValido = function (campo: string): boolean | undefined {
    let campoValido = undefined;

    if (!this.get(campo)?.valid && this.get(campo)?.touched)
        campoValido = false

    if (this.get(campo)?.valid)
        campoValido = true

    return campoValido
}
