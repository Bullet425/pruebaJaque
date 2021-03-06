import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
  {
    path: "users",
    // component: UsersComponent,
    loadChildren: () =>
      import("./components/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "**",
    redirectTo: "users",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
