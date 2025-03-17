import * as user from './1741269990949-users';
import * as smartcontracts from './1742269990949-smartcontracts';

user.seed().catch((error) => {
  console.error('Seeding failed:', error);
});

smartcontracts.seed().catch((error) => {
  console.error('Seeding failed:', error);
});
