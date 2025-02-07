import { User } from '@app/models';

export const ShowUserByEmailService = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
