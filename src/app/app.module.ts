import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { NamesPipe } from "./pipes/names.pipe";
import { RolPipe } from "./pipes/rol.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, UsersComponent, NamesPipe, RolPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
