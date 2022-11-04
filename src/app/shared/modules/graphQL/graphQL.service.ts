import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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

  query(query: string, variables?: any) {
    return this.apollo.watchQuery({
      query: gql`
        ${query}
      `,
      variables: { variables },
    });
  }
}
