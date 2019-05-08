import { onError } from "apollo-link-error";
import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { Apollo } from "apollo-angular";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

// const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql';
const uri = environment.gql_uri;

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: []
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private toastr: ToastrService
  ) {
    const http = httpLink.create({ uri });
    const logoutLink = onError(request => {
      if (request.graphQLErrors && request.graphQLErrors.length) {
        if (request.graphQLErrors[0].message.error) {
          this.toastr.error(request.graphQLErrors[0].message.error);
        }
        // throw new Error(JSON.stringify(request.graphQLErrors[0].message));
      }
    });

    const auth = setContext((_, { headers }) => {
      const token = localStorage.getItem("JWT_TOKEN");

      if (!token) {
        return {};
      } else {
        return {
          headers: { Authorization: `Bearer ${token}`, ...headers }
        };
      }
    });

    apollo.create({
      link: logoutLink.concat(auth.concat(http)),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
          errorPolicy: "ignore"
        },
        query: {
          fetchPolicy: "network-only",
          errorPolicy: "all"
        },
        mutate: {
          errorPolicy: "all"
        }
      }
    });
  }
}
