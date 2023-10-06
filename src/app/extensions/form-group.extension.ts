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

        if (this.get(item)?.invalid) {
            this.get(item)?.errors!['email'] ?
                erros.push('* E-mail informado em formato inválido') :
                erros.push(`* ${item} é obrigatório`)
            this.get(item)?.markAsTouched()
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