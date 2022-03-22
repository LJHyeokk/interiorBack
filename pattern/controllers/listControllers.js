import { listDataService } from '../services/listServices';

const listData = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await listDataService(user_id);

    res
      .status(201)
      .send({ message: 'SUCCESS', data: result, isAdmin: result.isAdmin });
  } catch (err) {
    res.status(err.status || 500).send({ message: 'FAIL', err: err.message });
  }
};

export { listData };
