import { User } from '@app/models';

export const ShowUserByApiKeyService = async (apiKey: string) => {
  const user = await User.findOne({ where: { apiKey } });
  return user;
};
