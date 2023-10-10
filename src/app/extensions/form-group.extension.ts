import { FormGroup } from "@angular/forms";

declare module '@angular/forms' {
    interface FormGroup {
        validate(): string[];
        campoValido(campo: string): boolean | undefined
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
            else
                msg = `* ${item} é obrigatório`

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