import { AbstractControl, ValidatorFn } from "@angular/forms";

export function CedulaLongitud(control: AbstractControl): {[key: string]: any } | null{
    const cedula =  control.value;
    if(cedula && (cedula.length > 10 || cedula.length < 10)){
      return {pocosCaracteres: true}

    }
    return null;


  }

 export function CedulaValidator(control: AbstractControl): {[key: string]: any} | null {
    const cedula = control.value;
    if(cedula && cedula.length === 10){
      const digito_region = parseInt(cedula.substring(0,2));
      if(digito_region >= 1 && digito_region <= 24){
        const ultimo_digito = cedula.substring(9,10);
        let pares = 0;
        let impares = 0;
        for(let i = 0; i < 9; i++){
          if(i % 2 === 0){
            impares += parseInt(cedula.charAt(i)) * 2;
            if(parseInt(cedula.charAt(i)) * 2 > 9){
              impares -= 9;
            }
          } else {
            pares += parseInt(cedula.charAt(i));
          }
        }
        const suma_total = pares + impares;
        const primer_digito_suma = String(suma_total).substring(0,1);
        const decena = (parseInt(primer_digito_suma) + 1) * 10;
        let digito_validador = decena - suma_total;
        if(digito_validador === 10){
          digito_validador = 0;
        }
        if(String(digito_validador) === ultimo_digito){
          return null; // La cédula es válida
        } else {
          return { cedulaInvalida: true }; // La cédula es inválida
        }
      } else {
        return { cedulaInvalida: true }; // La cédula es inválida
      }
    } else {
      return null; // No hay cédula o tiene menos/más de 10 dígitos, no validamos
    }
  }



  export function ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
  
      const birthday = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      birthday.setFullYear(today.getFullYear());
      if (today < birthday) {
        age--;
      }
  
      return age >= minAge ? null : { age: true };
    };
  }

  export function telefonoEcuadorValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const telefonoRegex = /^[0][2-7]\d{7}$/; // Expresión regular para validar un número de teléfono ecuatoriano (inicia con 0 y tiene 7 dígitos)
  
    if (control.value && !telefonoRegex.test(control.value)) { // Si el control tiene un valor y no cumple con el patrón
      return { telefonoEcuador: true }; // Devolvemos un objeto con la clave "telefonoEcuador" y valor true para indicar que no es un número de teléfono válido en Ecuador
    }
  
    return null; // Si el valor es válido, devolvemos null
  }


  export function telefonoCelularValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const telefonoCelularRegex = /^09\d{8}$/; // Expresión regular para validar el formato del número
    const codigoArea = '09'; // Código de área para teléfonos celulares en Ecuador
  
    if (control.value && !telefonoCelularRegex.test(control.value)) {
      return { 'telefonoCelular': true };
    }
  
    if (control.value && !control.value.startsWith(codigoArea)) {
      return { 'codigoArea': true };
    }
  
    return null;
  }

  export function maximoElementosValidator(maximo: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const lista = control.value;
      if (lista && lista.length > maximo) {
        return {'maximoElementos': true};
      } else {
        return null;
      }
    };
  }