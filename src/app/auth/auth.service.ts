import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Tokens } from "./token.interface";
import gql from "graphql-tag";
import { ToastrService } from "ngx-toastr";

const loginMutation = gql`
  mutation userLogin($credential: Credential) {
    userLogin(credential: $credential) {
      token
      refreshToken
    }
  }
`;

const logoutMutation = gql`
  mutation userLogout($refreshToken: String!) {
    userLogout(refreshToken: $refreshToken)
  }
`;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(
    private readonly router: Router,
    private apollo: Apollo,
    private toastr: ToastrService
  ) {}

  doLogin(credential: any) {
    this.apollo
      .mutate({
        mutation: loginMutation,
        variables: { credential }
      })
      .subscribe(result => {
        const data = result ? result.data : null;

        if (data && data.userLogin) {
          this.storeTokens(data.userLogin);
          this.toastr.success("Login Successful");
          this.apollo.getClient().resetStore();
          this.router.navigateByUrl("/users");
        } else {
          this.toastr.error("Invalid Credential");
        }
      });
  }

  doLogout() {
    const refreshToken = this.getRefreshToken();
    this.apollo
      .mutate({
        mutation: logoutMutation,
        variables: { refreshToken }
      })
      .subscribe(({ client }) => {
        this.removeTokens();
        this.toastr.success("Logout Successful");
        this.router.navigateByUrl("/login");
        this.apollo.getClient().clearStore();
      });
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
