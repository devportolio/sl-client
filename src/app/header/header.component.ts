import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {}

  logoutUser() {
    this.authService.doLogout();
  }

  authenticated() {
    return this.authService.isLoggedIn();
  }
}
