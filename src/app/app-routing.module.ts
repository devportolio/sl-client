import { AuthenticatedGuard } from "./guards/authenticated.guard";
import { UsersComponent } from "./users/users.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "users/edit/:id",
    component: UsersEditComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
