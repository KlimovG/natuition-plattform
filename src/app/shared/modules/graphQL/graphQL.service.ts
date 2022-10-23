import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable()
export class GraphQLService {
  constructor(private apollo: Apollo) {}
  mutation(mutation: string, variables: any, refetchQueries?: string) {
    return this.apollo.mutate({
      mutation: gql`
        ${mutation}
      `,
      variables,
    });
  }
}
