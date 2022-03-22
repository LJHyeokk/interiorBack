import { detailData } from '../models/detailDao';
import { checkIsAdmin } from '../models/userDao';

const detailDataService = async (id, user_id) => {
  const data = await detailData(id);

  if (user_id) {
    const isAdmin = await checkIsAdmin(user_id);
    data.isAdmin = isAdmin.is_admin;
  }

  return data;
};

export { detailDataService };
