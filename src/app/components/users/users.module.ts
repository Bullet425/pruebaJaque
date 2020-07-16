import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";

import { NamesPipe } from "../../pipes/names.pipe";
import { RolPipe } from "../../pipes/rol.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [UsersComponent, NamesPipe, RolPipe],
  imports: [CommonModule, UsersRoutingModule, FormsModule],
})
export class UsersModule {}
