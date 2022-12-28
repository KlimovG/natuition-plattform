import { NgModule } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { GraphQLService } from './graphQL.service';
import { HttpClientModule } from '@angular/common/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:3000/graphql';
const uriProd = 'http://172.16.3.5:3000/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const token = localStorage.getItem('token');
  const auth = setContext((operation, context) => {
    if (token)
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return undefined;
  });
  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  imports: [ApolloModule],
  providers: [
    GraphQLService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
