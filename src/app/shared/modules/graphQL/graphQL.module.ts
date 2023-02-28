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

// const uri = 'http://localhost:3000/graphql';
const uri = 'https://fleet.natuition.com/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = ApolloLink.from([httpLink.create({ uri })]);
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
