import { User } from '@app/models';

export class AddCurrentUserAction {
  static readonly type = '[User] Add user';
  constructor(readonly payload: User) {}
}

export class RemoveCurrentUserAction {
  static readonly type = '[User] Remove the current user';
}
