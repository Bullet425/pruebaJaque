import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import UserJson from "../../assets/users.json";
import RolesJson from "../../assets/roles.json";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  usuarios = UserJson["users"];
  roles = RolesJson["roles"];
  numberPages = [];
  sortedUsuarios = [];

  constructor(private http: HttpClient) {
    this.sortedUsuarios = this.usuarios;
  }

  ngOnInit() {}

  getUsuarios() {
    return this.usuarios;
  }

  getRoles() {
    return this.roles;
  }

  getNumberPages() {
    return this.numberPages;
  }

  buscarUsuarios(termino) {
    let busqueda = [];
    termino.toLowerCase();
    for (let usuario of this.sortedUsuarios) {
      let nameUser = usuario["name"].toLowerCase();
      let emailUser = usuario["email"].toLowerCase();
      if (nameUser.indexOf(termino) >= 0 || emailUser.indexOf(termino) >= 0) {
        busqueda.push(usuario);
      }
    }

    return busqueda;
  }

  ordernarUsuarios(tipo, property) {
    let result = this.sortedUsuarios;
    if (tipo === "az" || tipo === "disabled") {
      result.sort((name1, name2) => {
        if (name1[property] > name2[property]) {
          return 1;
        } else if (name1[property] < name2[property]) {
          return -1;
        }
        return 0;
      });
    } else if (tipo === "za" || tipo === "active") {
      result.sort((name1, name2) => {
        if (name1[property] < name2[property]) {
          return 1;
        } else if (name1[property] > name2[property]) {
          return -1;
        }
        return 0;
      });
    }
    return result;
  }

  pagination(numberPerPage, page) {
    if (numberPerPage === "todos") {
      numberPerPage = this.usuarios.length;
    }
    let arrayLength = this.usuarios.length;
    let numberFinal = parseInt(numberPerPage);
    let pages = Math.ceil(arrayLength / numberFinal);
    this.numberPages = [];
    for (let i = 0; i < pages; i++) {
      this.numberPages.push({ page: i });
    }

    let sortUsuarios = this.usuarios;
    let start = numberFinal * page;
    let final = numberFinal * (page + 1);
    if (final > this.usuarios.length) {
      final = this.usuarios.length;
    }
    sortUsuarios = sortUsuarios.slice(start, final);
    return (this.sortedUsuarios = sortUsuarios);
  }

  eliminarUsuario(name) {
    for (let nameArr of this.sortedUsuarios) {
      if (nameArr.name === name) {
        let index = this.sortedUsuarios.indexOf(nameArr);
        this.sortedUsuarios.splice(index, 1);
      }
    }
    for (let nameArr of this.usuarios) {
      if (nameArr.name === name) {
        let index = this.usuarios.indexOf(nameArr);
        this.usuarios.splice(index, 1);
      }
    }
  }

  cambiarStatus(name) {
    for (let nameArr of this.usuarios) {
      if (nameArr.name === name) {
        nameArr.active = !nameArr.active;
      }
    }
  }

  crearUsuario(ob, forma, modalType) {
    if (modalType === "nuevoUsuario") {
      let newO = {
        picture: forma.url,
        name: forma.nombrePersona,
        fathersLastName: forma.apellidoP,
        mothersLastName: forma.apellidoM,
        email: forma.emailPersona,
        roleId: parseInt(forma.admin),
        active: forma.modalImage,
      };
      this.usuarios.push(newO);
    } else {
      for (let nameArr of this.sortedUsuarios) {
        if (nameArr.name === ob.name) {
          nameArr.picture = forma.url;
          nameArr.name = forma.nombrePersona;
          nameArr.fathersLastName = forma.apellidoP;
          nameArr.mothersLastName = forma.apellidoM;
          nameArr.email = forma.emailPersona;
          nameArr.roleId = parseInt(forma.admin);
          nameArr.active = forma.admin;
          this.sortedUsuarios.push(nameArr);
          let index = this.sortedUsuarios.indexOf(nameArr);
          this.sortedUsuarios.splice(index, 1);
        }
      }
    }
  }
}
