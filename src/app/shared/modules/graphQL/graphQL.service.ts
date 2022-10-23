import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLService {
  constructor(private apollo: Apollo) {}
  mutation<T>(
    mutation: string,
    variables: any,
    refetchQueries?: string
  ): Observable<MutationResult<T>> {
    return this.apollo.mutate({
      mutation: gql`
        ${mutation}
      `,
      variables,
    });
  }
}
