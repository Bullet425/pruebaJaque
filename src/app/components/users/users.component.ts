import { Component } from "@angular/core";
import { UsuariosService } from "src/app/services/usuarios.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent {
  usuarios = [];
  numberPages = [];
  sortedUsuarios = [];
  currentOb = {};
  modalObj = {
    imgPrev:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    nomP: "",
    apelP: "",
    apelM: "",
    mailM: "",
    staM: "",
    rolM: "",
  };
  vista: Boolean = false;
  vistaModal: Boolean = false;
  modalImage: Boolean = false;
  modalType: String = "";
  page = 1;

  constructor(private usuariosService: UsuariosService) {
    this.usuarios = this.usuariosService.getUsuarios();
    this.sortedUsuarios = this.usuariosService.getUsuarios();
  }

  buscarUsuarios(termino) {
    this.sortedUsuarios = this.usuariosService.buscarUsuarios(termino);
  }

  ordernarUsuarios(termino, property) {
    this.usuariosService.ordernarUsuarios(termino, property);
  }

  pagination(numberPerPage, page) {
    this.sortedUsuarios = this.usuariosService.pagination(numberPerPage, page);
    this.numberPages = this.usuariosService.getNumberPages();
  }

  cambiarStatus(name: String) {
    this.usuariosService.cambiarStatus(name);
  }

  nuevoUsuario(ob, type: String) {
    this.modalObj.imgPrev = ob.picture;
    if (!this.modalObj.imgPrev) {
      this.modalObj.imgPrev =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    }
    this.modalObj.nomP = ob.name;
    this.modalObj.apelP = ob.fathersLastName;
    this.modalObj.apelM = ob.mothersLastName;
    this.modalObj.mailM = ob.email;
    this.modalObj.staM = ob.active;
    this.modalObj.rolM = ob.roleId;
    this.vistaModal = true;
    this.modalType = type;
    this.currentOb = ob;
  }

  eliminarUsuario(name) {
    this.usuariosService.eliminarUsuario(name);
  }

  cancelarModal() {
    this.vistaModal = false;
    this.modalObj.imgPrev =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  }

  guardar(forma) {
    this.vistaModal = false;

    forma.value.modalImage = this.modalImage;
    this.usuariosService.crearUsuario(
      this.currentOb,
      forma.value,
      this.modalType
    );
  }
}
