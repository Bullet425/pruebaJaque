import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "src/app/services/usuarios.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  usuarios = [];
  roles = [];
  numberPages = [];
  sortedUsuarios = [];
  currentOb = {};
  vista = false;
  vistaModal = false;
  modalImage = false;
  page = 1;
  modalType = "";
  imgPrev =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  nomP;
  apelP;
  apelM;
  mailM;
  staM;
  rolM;

  constructor(private usuariosService: UsuariosService) {
    this.usuarios = this.usuariosService.getUsuarios();
    this.sortedUsuarios = this.usuariosService.getUsuarios();
  }

  ngOnInit() {}

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

  cambiarStatus(name) {
    this.usuariosService.cambiarStatus(name);
  }

  nuevoUsuario(ob, type) {
    this.imgPrev = ob.picture;
    if (!this.imgPrev) {
      this.imgPrev =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    }
    this.nomP = ob.name;
    this.apelP = ob.fathersLastName;
    this.apelM = ob.mothersLastName;
    this.mailM = ob.email;
    this.staM = ob.active;
    this.rolM = ob.roleId;
    this.vistaModal = true;
    this.modalType = type;
    this.currentOb = ob;
  }

  eliminarUsuario(name) {
    this.usuariosService.eliminarUsuario(name);
  }

  cancelarModal() {
    this.vistaModal = false;
    this.imgPrev =
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
