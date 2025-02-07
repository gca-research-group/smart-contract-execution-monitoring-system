import { User } from '@app/models';

export const ShowUserService = async (id: number) => {
  const user = await User.findOne({ where: { id } });
  return user;
};
