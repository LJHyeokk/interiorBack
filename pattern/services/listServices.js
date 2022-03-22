import { listData } from '../models/listDao';
import { checkIsAdmin } from '../models/userDao';

const listDataService = async (user_id) => {
  const data = await listData();

  if (user_id) {
    const isAdmin = await checkIsAdmin(user_id);
    data.isAdmin = isAdmin.is_admin;
  }

  return data;
};

export { listDataService };
