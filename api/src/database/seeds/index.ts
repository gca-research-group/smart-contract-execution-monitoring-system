import * as user from './1741269990949-users';

user.seed().catch((error) => {
  console.error('Seeding failed:', error);
});
