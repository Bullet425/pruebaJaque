import { Pipe, PipeTransform } from "@angular/core";

import { UsuariosService } from "src/app/services/usuarios.service";

@Pipe({
  name: "rol",
})
export class RolPipe implements PipeTransform {
  usuarios = [];
  roles = [];
  constructor(private usuariosService: UsuariosService) {
    this.usuarios = this.usuariosService.getUsuarios();
  }

  transform(value: any, ...args: any[]): any {
    if (value === 1) {
      return (value = "Dueño");
    } else if (value === 2) {
      return (value = "Administrador");
    }
    return (value = "Staff");
  }
}
