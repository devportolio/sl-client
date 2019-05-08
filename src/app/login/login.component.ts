import { AuthService } from "./../auth/auth.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Component, OnInit } from "@angular/core";

const loginMutation = gql`
  mutation userLogin($credential: Credential) {
    userLogin(credential: $credential) {
      token
      refreshToken
    }
  }
`;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apollo: Apollo,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  submitLogin() {
    let credential = this.form.value;

    if (!this.form.invalid) {
      this.authService.doLogin(credential);
    }
  }
}
