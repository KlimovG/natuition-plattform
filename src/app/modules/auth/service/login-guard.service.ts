import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { State } from '../../../state';
import { lastValueFrom, take } from 'rxjs';
import { GC_AUTH_TOKEN, GC_USER_ID } from '../constants';
import { GraphQLService } from '../../../shared/modules/graphQL/graphQL.service';

const VERIFY = `
  mutation Validate($input: UserVerifyInput!) {
    validate(input: $input)
  }
`;

export interface IVerify {
  validate: boolean;
}
//TODO: Complete LoginGuard
@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router,
    private graphQlService: GraphQLService
  ) {}
  async canActivate(): Promise<boolean> {
    const user = await lastValueFrom(
      this.store.pipe(
        select((state) => state.auth),
        take(1)
      )
    );
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    const email = localStorage.getItem(GC_USER_ID);
    const { data } = await lastValueFrom(
      this.graphQlService.mutation<IVerify>(VERIFY, { input: { token, email } })
    );
    console.log(data);
    console.log(user);
    const isLogged = user.isLogged || data?.validate;
    console.log(isLogged);
    if (!isLogged) {
      await this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
