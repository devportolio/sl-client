import { RegistrationInput, UsersEditDTO } from "./users.dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import {
  USERS_LIST_QUERY,
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  GET_USER_QUERY,
  UPDATE_USER_MUTATION
} from "./users.query";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  getUsersList(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USERS_LIST_QUERY
    }).valueChanges;
  }

  getUser(userId: string): Observable<any> {
    return this.apollo.query({
      query: GET_USER_QUERY,
      variables: { userId }
    });
  }

  updateUser(userId: string, input: UsersEditDTO): Observable<any> {
    const { firstname, lastname, email } = input;
    return this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        userId,
        input: {
          firstname,
          lastname,
          email
        }
      },
      refetchQueries: [{ query: USERS_LIST_QUERY }]
    });
  }

  registerUser(input: RegistrationInput): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: { input }
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { userId },
      refetchQueries: [{ query: USERS_LIST_QUERY }]
    });
  }
}
